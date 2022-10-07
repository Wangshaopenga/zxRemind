import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { lastValueFrom } from 'rxjs'
import { Cron } from '@nestjs/schedule'
import { ConfigService } from '@nestjs/config'
import { homework } from '@/types'
import { EmailService } from '@/email/email.service'
dayjs.extend(duration)
@Injectable()
export class AppService {
  constructor(private httpService: HttpService, private emailService: EmailService, private config: ConfigService) { }
  async getTime(type: homework) {
    const infos = []
    const course = await this.getCourseData()
    const list = []
    course.forEach((el) => {
      list.push(this.getHomeWordData(type, el._id, '612b83c57087112fed855230', el.course.name))
    })
    const p = await Promise.all(list)
    p.forEach((el) => {
      el.forEach((e) => {
        if (!e.studentHomework || e.studentHomework.answerProgress < 1) {
          const now = dayjs()
          const end = dayjs(e.endtime)
          if (now.isBefore(end)) {
            const days = end.diff(now, 'days')
            const hours = end.diff(now, 'hours')
            const minutes = end.diff(now, 'minutes')
            infos.push(`${e.courseName} ${type}作业 ${e.title} 还有${days}天${hours - 24 * days}小时${minutes - hours * 60}分钟 截至`)
          }
        }
      })
    })
    return infos
  }

  async getCourseData() {
    const response$ = this.httpService.get('/stu/course')
    const res = await lastValueFrom(response$)
    return res.data.data
  }

  async getHomeWordData(category: homework, tcc_id: string, student_id: string, course: string) {
    const response$ = this.httpService.post('/stu/homework/filter', {
      category,
      student_id,
      tcc_id,
    })
    const res = await lastValueFrom(response$)
    res.data.data.forEach((e) => {
      e.courseName = course
    })
    return res.data.data
  }

  @Cron('0 0 20 * * *')
  async remind() {
    const experiment = await this.getTime('课程实验')
    const homework = await this.getTime('课后作业')
    const info: string[] = []
    experiment.forEach((e) => {
      info.push(e)
    })
    homework.forEach((e) => {
      info.push(e)
    })
    const day: string[] = []
    const hour: string[] = []
    info.forEach((e: string) => {
      const h = e.indexOf('小时')
      const d = e.indexOf('天')
      if (Number(e[h - 1]) === 0)
        hour.push(e)
      if (Number(e[d - 1]) === 1)
        day.push(e)
    })
    if (hour.length !== 0 || day.length !== 0)
      this.emailService.sendEmail([...hour, ...day])
  }

  setToken(token: string) {
    process.env.TOKEN = token
    return 'OK'
  }
}

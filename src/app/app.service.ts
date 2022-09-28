import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { homework, logindata } from '@/types'
dayjs.extend(duration)
@Injectable()
export class AppService {
  constructor(private httpService: HttpService) { }
  async getTime() {
    const infos = []
    const course = await this.getCourseData()
    const list = []
    course.forEach((el) => {
      list.push(this.getHomeWordData('课程实验', el._id, '612b83c57087112fed855230', el.course.name))
    })
    const p = await Promise.all(list)
    p.forEach((el) => {
      el.forEach((e) => {
        const now = dayjs()
        const end = dayjs(e.endtime)
        if (now.isBefore(end)) {
          const days = end.diff(now, 'days')
          const hours = end.diff(now, 'hours')
          const minutes = end.diff(now, 'minutes')
          infos.push(`${e.courseName} 课程实验作业中 ${e.title} 还有${days}天${hours - 24 * days}小时${minutes - hours * 60}截至`)
        }
      })
    })
    return infos
  }

  async login(data: logindata) {
    const response$ = this.httpService.post('/auth/login', {
      body: {
        ...data,
      },
    })
    const res = await lastValueFrom(response$)
    return res
  }

  async getCourseData() {
    const response$ = this.httpService.get('/course')
    const res = await lastValueFrom(response$)
    return res.data.data
  }

  async getHomeWordData(category: homework, tcc_id: string, student_id: string, course: string) {
    const response$ = this.httpService.post('/homework/filter', {
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
}

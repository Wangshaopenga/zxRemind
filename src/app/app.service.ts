import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import axios from 'axios'
import { homework, logindata } from '@/types'
dayjs.extend(duration)
@Injectable()
export class AppService {
  constructor(private httpService: HttpService) { }
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
        if (!e.studentHomework) {
          const now = dayjs()
          const end = dayjs(e.endtime)
          if (now.isBefore(end)) {
            const days = end.diff(now, 'days')
            const hours = end.diff(now, 'hours')
            const minutes = end.diff(now, 'minutes')
            infos.push(`${e.courseName} ${type}作业 ${e.title} 还有${days}天${hours - 24 * days}小时${minutes - hours * 60}截至`)
          }
        }
      })
    })
    return infos
  }

  async login(data: logindata) {
    axios.post('https://cyber-tea-platform.anrunlu.net/auth/login', {
      body: {
        username: '2020414382',
        password: 'kkxx123.',
      },
    })
      .then((res) => {
        console.log(res)
      }, (err) => {
        console.log(err)
      })
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
}

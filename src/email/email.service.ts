import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) { }
    sendEmail(info: string[]) {
        let str = '<ul style="list-style:none;">'
        info.forEach((e) => {
            str += `<li>${e}</li>`
        })
        str += '</ul>'
        this.mailerService.sendMail({
            to: '483041241@qq.com', // 接收信息的邮箱
            from: 'wangshaopenga@163.com', // 要发送邮件的邮箱
            subject: '作业要截止了!!!',
            html: str,
        })
    }
}

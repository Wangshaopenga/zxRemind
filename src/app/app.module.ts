import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { MailerModule } from '@nestjs-modules/mailer'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EmailModule } from '@/email/email.module'
import { EmailService } from '@/email/email.service'

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule, ScheduleModule.forRoot()],
      inject: [ConfigService],
      useFactory: () => ({
        timeout: 10000,
        maxRedirects: 5,
        baseURL: 'https://cyber-tea-platform.anrunlu.net',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.NjEyYjgzYzU3MDg3MTEyZmVkODU1MjJm.0YD2dZ4a9gCWmemQufu0WHAJ1K5gVc2FBHDUfDwtuoc',
        },
      }),
    }),
    EmailModule,
    MailerModule.forRoot({
      transport: {
          host: 'smtp.163.com',
          port: '465',
          auth: {
            user: 'wangshaopenga@163.com',
            pass: 'CJGMZWJECJUIEZSG',
          },
        from: '"your email name" <your eamil@163.com>',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EmailService, ConfigService],
})
export class AppModule { }

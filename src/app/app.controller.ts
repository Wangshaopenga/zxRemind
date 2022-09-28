import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { AppService } from './app.service'
import { homework, logindata } from '@/types'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTime(@Query('type') type: homework) {
    return this.appService.getTime(type)
  }

  @Post('login')
  login(@Body() data: logindata) {
    return this.appService.login(data)
  }
}

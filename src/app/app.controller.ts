import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { logindata } from '@/types'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getTime()
  }

  @Post('login')
  login(@Body() data: logindata) {
    return this.appService.login(data)
  }
}

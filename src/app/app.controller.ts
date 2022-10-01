import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { AppService } from './app.service'
import { typePipe } from './pipes/type.pipe'
import { homework, logindata } from '@/types'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get() {
    return `
      <h1 color="red">王少鹏真帅呀!!</h1>
    `
  }

  @Get('1')
  getTime(@Query('type', typePipe) type: homework) {
    return this.appService.getTime(type)
  }

  @Post('login')
  login(@Body() data: logindata) {
    return this.appService.login(data)
  }

  @Get('info')
  get1() {
    return 1234
  }
}

import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common'
import { typePipe } from './pipes/type.pipe'
import { AppService } from './app.service'
import { homework } from '@/types'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTime(@Query('type', typePipe) type: homework) {
    return this.appService.getTime(type)
  }

  @Post('token')
  setToken(@Body('token') token: string) {
    if (!token)
      throw new BadRequestException({ message: 'token不能为空' })
    this.appService.setToken(token)
  }
}

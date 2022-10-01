import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { tokenDto } from './dto/tokenDto'
import { typePipe } from './pipes/type.pipe'
import { AuthGuard } from './guards/auth.guard'
import { homework, logindata } from '@/types'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get() {
    return 12
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

import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: 'https://cyber-tea-platform.anrunlu.net',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.NjEyYjgzYzU3MDg3MTEyZmVkODU1MjJm.0YD2dZ4a9gCWmemQufu0WHAJ1K5gVc2FBHDUfDwtuoc',
        // Authorization: 'Bearer ',
      },
    }),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

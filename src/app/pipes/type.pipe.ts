/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class typePipe implements PipeTransform {
  transform(value: any) {
    if (!['课前预习', '课后作业', '课程实验', '课程论文', '课程设计', '毕业论文'].includes(value))
      throw new BadRequestException('查询类型错误')
    return value
  }
}

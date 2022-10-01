import { IsNotEmpty } from 'class-validator'

export class typeDto {
  @IsNotEmpty()
  type: '课前预习' | '课后作业' | '课程实验' | '课程论文' | '课程设计' | '毕业论文'
}

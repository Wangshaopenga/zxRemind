import { IsNotEmpty } from 'class-validator'

export class tokenDto {
  @IsNotEmpty({ message: '令牌不能为空!' })
  token: string
}

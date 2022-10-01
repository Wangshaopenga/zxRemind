import { HttpService } from '@nestjs/axios'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable, lastValueFrom } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private http: HttpService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const http = new HttpService()
    const response$ = http.get('https://cyber-tea-platform.anrunlu.net/auth/user', {
      headers: {
        Authorization: `Bearer ${request.body.token}`,
      },
    })
    console.log(request.body.token)
    lastValueFrom(response$).then((res) => {
      console.log(res)
    })
    return validateRequest()
  }
}

function validateRequest() {
  // const response$ = this.http.
  return true
}

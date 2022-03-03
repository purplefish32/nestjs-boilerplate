import { Controller, Get } from '@nestjs/common';
import { first, lastValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHelloWorld() {
    return 'Hello World!';
  }

  @Get('/hello-observable')
  async getHelloUserObservable() {
    const observable$ = this.appService.getNameAsObservable().pipe(first());
    const name = await lastValueFrom(observable$);

    return `Hello ${name.title} ${name.first} ${name.last}! (Observable)`;
  }

  @Get('/hello-promise')
  async getHelloUserPromise() {
    const name = await this.appService.getNameAsPromise();

    return `Hello ${name.title} ${name.first} ${name.last}! (Promise)`;
  }
}

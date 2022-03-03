import { Name } from './name.type';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  public getNameAsObservable(): Observable<Name> {
    return this.getUser().pipe(
      map((response) => {
        return response.data.results[0].name;
      }),
    );
  }

  public async getNameAsPromise(): Promise<Name> {
    const response = await this.getUser().toPromise();

    return response.data.results[0].name;
  }

  private getUser() {
    return this.httpService.get('https://randomuser.me/api/');
  }
}

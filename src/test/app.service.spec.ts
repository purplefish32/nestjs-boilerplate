import { of, lastValueFrom } from 'rxjs';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './../app.service';
import { AxiosResponse } from 'axios';

describe('AppService', () => {
  let appService: AppService;
  let httpService: HttpService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AppService],
    }).compile();

    httpService = app.get<HttpService>(HttpService);
    appService = app.get<AppService>(AppService);
  });

  describe('getNameAsObservable', () => {
    it('should return observable with data', () => {
      const result: AxiosResponse = {
        data: {
          results: [
            {
              name: {
                title: 'mr',
                first: 'jean',
                last: 'dupont',
              },
            },
          ],
        },
        status: 200,
        statusText: '',
        headers: {},
        config: {},
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));

      expect(lastValueFrom(appService.getNameAsObservable())).resolves.toEqual({
        first: 'jean',
        last: 'dupont',
        title: 'mr',
      });
    });
  });

  describe('getNameAsPromise', () => {
    it('should return promise with data', () => {
      const result: AxiosResponse = {
        data: {
          results: [
            {
              name: {
                title: 'mr',
                first: 'jean',
                last: 'dupont',
              },
            },
          ],
        },
        status: 200,
        statusText: '',
        headers: {},
        config: {},
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));

      expect(appService.getNameAsPromise()).resolves.toEqual({
        first: 'jean',
        last: 'dupont',
        title: 'mr',
      });
    });
  });
});

import { of } from 'rxjs';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AxiosResponse } from 'axios';

describe('AppController', () => {
  let appController: AppController;
  let httpService: HttpService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    httpService = app.get<HttpService>(HttpService);
    appController = app.get<AppController>(AppController);
  });

  describe('hello-world', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHelloWorld()).toBe('Hello World!');
    });
  });

  describe('hello-observable', () => {
    it('should return "Hello World!"', async () => {
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

      expect(await appController.getHelloUserObservable()).toBe(
        'Hello mr jean dupont! (Observable)',
      );
    });
  });

  describe('hello-promise', () => {
    it('should return "Hello World!"', async () => {
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

      expect(await appController.getHelloUserPromise()).toBe(
        'Hello mr jean dupont! (Promise)',
      );
    });
  });
});

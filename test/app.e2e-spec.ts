import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { HttpService } from '@nestjs/axios';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    httpService = moduleFixture.get<HttpService>(HttpService);

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/hello-observable (GET)', async () => {
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

    return await request(app.getHttpServer())
      .get('/hello-observable')
      .expect(200)
      .expect('Hello mr jean dupont! (Observable)');
  });

  it('/hello-promise (GET)', async () => {
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

    return await request(app.getHttpServer())
      .get('/hello-promise')
      .expect(200)
      .expect('Hello mr jean dupont! (Promise)');
  });
});

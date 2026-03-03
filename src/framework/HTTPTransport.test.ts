import sinon from 'sinon';
import type { SinonFakeXMLHttpRequestStatic, SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { HTTPTransport } from './HTTPTransport';

describe('Тесты модуля HTTPTransport', () => {

  let xhr: SinonFakeXMLHttpRequestStatic;
  let http: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];
  let data: Record<string, string | number>;
  const requrl: string = 'https://ya-praktikum.tech/api/v2/test';
  const baseurl: string = 'https://ya-praktikum.tech/api/v2';

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = (req) => requests.push(req);
    http = new HTTPTransport();
    data = { param1: 1, param2: 'hello' };
  });

  afterEach(() => {
    requests = [];
    xhr.restore();
  });

  describe('Вызываются правильные методы', () => {
    it('GET', () => {
      void http.get('/');
      const [request] = requests;
      expect(request.method).to.equal('GET');
    });
    it('POST', () => {
      void http.post('/');
      const [request] = requests;
      expect(request.method).to.equal('POST');
    });
    it('PUT', () => {
      void http.put('/');
      const [request] = requests;
      expect(request.method).to.equal('PUT');
    });
    it('DELETE', () => {
      void http.delete('/');
      const [request] = requests;
      expect(request.method).to.equal('DELETE');
    });
  });

  describe('Утилита queryString', () => {
    it('сложная строка co спецсимволами строится правильно', () => {
      data = { string: 'string', number: 777, complex: '%124,.+&$#@свашта', empty: '' };
      expect(http.queryString(data)).to.equal('?string=string&number=777&complex=%25124%2C.%2B%26%24%23%40%D1%81%D0%B2%D0%B0%D1%88%D1%82%D0%B0&empty=');
    });
  });

  describe('Тесты GET', () => {
    it('URL запроса правильный', () => {
      const expectedUrl = `${baseurl}/get`;
      void http.post('/get', { data });
      const request = requests[0];
      expect(request.url).to.equal(expectedUrl);
    });
    it('Query строка включена в запрос', () => {
      const expectedUrl = `${requrl}?param1=1&param2=hello`;
      void http.get('/test', { data });
      const request = requests[0];
      expect(request.url).to.equal(expectedUrl);
    });
    it('Запрос только один', () => {
      void http.get('/test', { data });
      expect(requests).to.have.lengthOf(1);
    });
  });

  describe('Тесты POST', () => {
    it('URL запроса правильный', () => {
      const expectedUrl = `${baseurl}/post`;
      void http.post('/post', { data });
      const request = requests[0];
      expect(request.url).to.equal(expectedUrl);
    });
    it('Query строка отсутствует в url запроса', () => {
      void http.post('/test', { data });
      const request = requests[0];
      expect(request.url).not.to.include('param');
    });
    it('Запрос содержит данные', () => {
      void http.post('/test', { data });
      const request = requests[0];
      expect(request.requestBody).to.deep.equal(JSON.stringify(data));
    });
    it('Запрос только один', () => {
      void http.post('/test', { data });
      expect(requests).to.have.lengthOf(1);
    });
  });

  describe('Тесты PUT', () => {
    it('URL запроса правильный', () => {
      const expectedUrl = `${baseurl}/put`;
      void http.post('/put', { data });
      const request = requests[0];
      expect(request.url).to.equal(expectedUrl);
    });
    it('Query строка отсутствует в url запроса', () => {
      void http.post('/test', { data });
      const request = requests[0];
      expect(request.url).not.to.include('param');
    });
    it('Запрос содержит данные', () => {
      void http.post('/test', { data });
      const request = requests[0];
      expect(request.requestBody).to.deep.equal(JSON.stringify(data));
    });
    it('Запрос только один', () => {
      void http.post('/test', { data });
      expect(requests).to.have.lengthOf(1);
    });
  });

  describe('Тесты DELETE', () => {
    it('URL запроса правильный', () => {
      const expectedUrl = `${baseurl}/delete`;
      void http.post('/delete', { data });
      const request = requests[0];
      expect(request.url).to.equal(expectedUrl);
    });
    it('Query строка отсутствует в url запроса', () => {
      void http.post('/test', { data });
      const request = requests[0];
      expect(request.url).not.to.include('param');
    });
    it('Запрос содержит данные', () => {
      void http.post('/test', { data });
      const request = requests[0];
      expect(request.requestBody).to.deep.equal(JSON.stringify(data));
    });
    it('Запрос только один', () => {
      void http.post('/test', { data });
      expect(requests).to.have.lengthOf(1);
    });
  });

});

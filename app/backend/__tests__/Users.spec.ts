import ChildProcess from 'child_process';
import Axios from 'axios';
import QueryString from 'qs';
import { Page1Users, Page2Users, PauloEduardoUser } from './mocks/User.mock';

const AxiosClient = Axios.create({
  baseURL: 'http://localhost:3001',
  paramsSerializer: (params: any) => QueryString.stringify(params, { arrayFormat: 'repeat' }),
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function exec(command: string) {
  return new Promise((resolve, reject) => {
    ChildProcess.exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      resolve(stdout);
    });
  });
}

describe('Users', () => {
  jest.setTimeout(30000);
  beforeEach(async () => {
    await exec('npm run migrate:undo');
  });
  describe('GET /users', () => {
    it('should return 10 users with no query params', async () => {
      const result = await AxiosClient.get('/users');
      expect(result.status).toBe(200);
      expect(Page1Users).toEqual(result.data);
    });
    it('Should return the page 1 when queryParams page=1', async () => {
      const result = await AxiosClient.get('/users', { params: { page: 1 } });
      expect(result.status).toBe(200);
      expect(result.data).toEqual(Page1Users);
    });

    it('Should return the page 2 when queryParams page=2', async () => {
      const result = await AxiosClient.get('/users', { params: { page: 2 } });
      expect(result.status).toBe(200);
      expect(result.data).toEqual(Page2Users);
    });

    it('Should return the page 1 when queryParams page=0', async () => {
      const result = await AxiosClient.get('/users', { params: { page: 0 } });
      expect(result.status).toBe(200);
      expect(result.data).toEqual(Page1Users);
    });
    it('Should return the page 1 when queryParams page=-200', async () => {
      const result = await AxiosClient.get('/users', { params: { page: -200 } });
      expect(result.status).toBe(200);
      expect(result.data).toEqual(Page1Users);
    });

    it('Should return the user Paulo Eduardo when queryParams name=Paulo Eduardo', async () => {
      const result = await AxiosClient.get('/users', { params: { name: 'Paulo Eduardo' } });
      expect(result.status).toBe(200);
      expect(result.data).toEqual([PauloEduardoUser]);
    });

    it('Should return the user Paulo Eduardo when queryParams email=pauloeduardods@email.com', async () => {
      const result = await AxiosClient.get('/users', { params: { email: 'pauloeduardods@email.com' } });
      expect(result.status).toBe(200);
      expect(result.data).toEqual([PauloEduardoUser]);
    });

    it('Should return the user Paulo Eduardo when queryParams email=pauloeduardods@email.com && name=Paulo Eduardo', async () => {
      const result = await AxiosClient.get('/users', { params: { email: 'pauloeduardods@email.com', name: 'Paulo Eduardo' } });
      expect(result.status).toBe(200);
      expect(result.data).toEqual([PauloEduardoUser]);
    });

    it('Should return the 404 Status and empty array if dont find any user', async () => {
      const result = await AxiosClient.get('/users', { params: { email: 'xaulinmatadordeporco@email.com', name: 'Xaulin Matador de Porco' } }).catch(error => error);
      expect(result.response.status).toBe(404);
      expect(result.response.data).toEqual([]);
    });
  });
});

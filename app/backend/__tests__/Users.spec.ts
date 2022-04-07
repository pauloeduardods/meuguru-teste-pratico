import ChildProcess from 'child_process';
import Axios from 'axios';
import QueryString from 'qs';
import { PrismaClient } from '@prisma/client';

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

const usersMock = [
  { id: 1, email: 'pauloeduardods@email.com', name: 'Paulo Eduardo' },
  { id: 2, email: 'nilu@prisma.io', name: 'Nilu' },
  { id: 3, email: 'mahmoud@prisma.io', name: 'Mahmoud' }
];

const prisma = new PrismaClient();

describe('Users', () => {
  jest.setTimeout(30000);
  beforeEach(async () => {
    await prisma.user.deleteMany({});
    await exec('npm run migrate');
    await exec('npm run seed');
  });
  // afterEach(async () => {
  //   await prisma.user.deleteMany({});
  // });
  describe('GET /users', () => {
    it('should return 10 users with no query params', async () => {
      const result = await AxiosClient.get('/users');
      console.log(result.data)
      expect(true).toEqual(result.data);
    });
  });
});

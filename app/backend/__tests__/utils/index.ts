import ChildProcess from 'child_process';
import Axios from 'axios';
import QueryString from 'qs';

const AxiosClient = Axios.create({
  baseURL: 'http://localhost:3001',
  paramsSerializer: (params: any) => QueryString.stringify(params, { arrayFormat: 'repeat' }),
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function Exec(command: string) {
  return new Promise((resolve, reject) => {
    ChildProcess.exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      resolve(stdout);
    });
  });
}

export { AxiosClient, Exec }
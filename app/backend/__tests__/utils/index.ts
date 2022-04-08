import ChildProcess from 'child_process';
import Axios from 'axios';
import QueryString from 'qs';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

const AxiosClient = Axios.create({
  baseURL: `http://localhost:${PORT}`,
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
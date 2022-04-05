import { IHTTPStatusCode } from '../helpers';

export interface IUserLogin {
  name: string;
  email: string;
}

export interface IUser extends IUserLogin {
  id?: number;
  password: string;
}

export interface ServiceResponse<T> {
  status: keyof IHTTPStatusCode;
  payload: T;
}

export interface ErrorMessage {
  message: string;
}

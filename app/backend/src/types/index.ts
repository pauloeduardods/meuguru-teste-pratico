import { IHTTPStatusCode } from '../helpers';

export interface IUserLogin {
  password: string;
  email: string;
}

export interface IUser extends IUserLogin {
  id?: number;
  name: string;
}

export interface ServiceResponse<T> {
  status: keyof IHTTPStatusCode;
  payload: T;
}

export interface ErrorMessage {
  message: string;
}

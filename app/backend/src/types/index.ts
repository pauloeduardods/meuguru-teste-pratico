import { IHTTPStatusCode } from '../helpers';

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface ServiceResponse<T> {
  status: keyof IHTTPStatusCode;
  payload: T;
}

export interface ErrorMessage {
  message: string;
}

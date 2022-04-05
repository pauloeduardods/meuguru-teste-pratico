import dotenv from 'dotenv';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { IUser } from '../types';

dotenv.config();

const options: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const TOKEN: string = process.env.JWT_SECRET || 'secret';

export const GenerateToken = (payload: Omit<IUser, 'password'>): string => {
  const token: string = sign(payload, TOKEN, options);
  return token;
};

export const VerifyToken = (token: string): Omit<IUser, 'password'> | boolean => {
  try {
    const payload = verify(token, TOKEN, options);
    return payload as Omit<IUser, 'password'>;
  } catch (error) {
    return false;
  }
};

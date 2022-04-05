import { NextFunction, Request, Response } from 'express';
import { VerifyToken } from '../auth/jwt';
import { HTTPStatusCode } from '../helpers';
import { IUser } from '../types';

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(HTTPStatusCode.Unauthorized).json({
        message: 'Token not found',
      }).end();
    }
    const payload = VerifyToken(token);
    if (!payload) {
      return res.status(HTTPStatusCode.Unauthorized).json({
        message: 'Invalid token',
      }).end();
    }
    req.user = payload as Omit<IUser, 'password'>;
    next();
  } catch (error) {
    next(error);
  }
}

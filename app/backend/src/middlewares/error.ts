import { Errback, NextFunction, Request, Response } from 'express';
import { HTTPStatusCode } from '../helpers';

export default function ErrorMiddleware(err: Errback, _req: Request, res: Response, _next: NextFunction): void {
  console.error(err)
  return res.status(HTTPStatusCode.InternalServerError).json({
    message: 'Internal server error',
  }).end();
}

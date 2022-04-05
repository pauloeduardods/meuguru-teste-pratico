import { NextFunction, Request, Response } from 'express';
import { HTTPStatusCode } from '../helpers';
import { UpdateUserSchema, UserSchema } from '../validation/user.validation';

class ValidationMiddleware {
  static validateNewUser(req: Request, res: Response, next: NextFunction) {
    const validation = UserSchema.validate(req.body);
    if (validation.error) {
      return res.status(HTTPStatusCode.BadRequest).json({
        status: 'BadRequest',
        payload: validation.error.details[0].message,
      });
    }
    next();
  }

  static validateUpdateUser(req: Request, res: Response, next: NextFunction) {
    const validation = UpdateUserSchema.validate(req.body);
    if (validation.error) {
      return res.status(HTTPStatusCode.BadRequest).json({
        status: 'BadRequest',
        payload: validation.error.details[0].message,
      });
    }
    next();
  }
}

export default ValidationMiddleware;

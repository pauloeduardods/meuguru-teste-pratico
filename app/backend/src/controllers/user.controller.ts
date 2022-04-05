import { NextFunction, Request, Response } from 'express';
import { HTTPStatusCode } from '../helpers';
import UserService from '../services/user.service';

class UserController {
  public static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page } = req.query;
      const response = await UserService.getAllUsers(page as string | number);
      return res.status(HTTPStatusCode[response.status]).json(response.payload).end();
    } catch (error) {
      next(error);
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const response = await UserService.create({ name, email, password });
      return res.status(HTTPStatusCode[response.status]).json(response.payload).end();
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;

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
}

export default UserController;

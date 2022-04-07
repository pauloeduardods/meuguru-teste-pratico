import { NextFunction, Request, Response } from 'express';
import { HTTPStatusCode } from '../helpers';
import UserService from '../services/user.service';
import { IUser } from '../types';

class UserController {
  public static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, email, name } = req.query;
      const response = await UserService
        .getAllUsers(page as string | number, email as string, name as string);
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

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email } = req.body;
      const id = req.user?.id;
      const response = await UserService.update(id as number, { name, email });
      return res.status(HTTPStatusCode[response.status]).json(response.payload).end();
    } catch (error) {
      next(error);
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await UserService.login(req.body);
      return res.status(HTTPStatusCode[response.status]).json(response.payload).end();
    } catch (error) {
      next(error);
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.user?.id;
      const response = await UserService.delete(id as number);
      return res.status(HTTPStatusCode[response.status]).json(response.payload).end();
    } catch (error) {
      next(error);
    }
  }

  public static async validateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { user } = req;
      const { id, name, email } = user as Omit<IUser, 'password'>;
      if (!id || !email || !name) {
        return res.status(HTTPStatusCode.Unauthorized).json({
          status: 'error',
          message: 'Unauthorized',
        }).end();
      }
      return res.status(HTTPStatusCode.OK).json({ id, email, name }).end();
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;

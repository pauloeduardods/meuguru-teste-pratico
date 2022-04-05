import { GenerateToken } from '../auth/jwt';
import UserModel from '../models/user';
import { ErrorMessage, IUser, IUserLogin, ServiceResponse } from '../types';

export interface IToken {
  token: string;
}

class UserService {
  private userModel: UserModel;

  constructor(userModel = new UserModel()) {
    this.userModel = userModel;
  }

  public async getAllUsers(page?: number | string, email?: string, name?: string):
  Promise<ServiceResponse<IUser[]>> {
    const curPage = page && page > 0 ? parseInt(page.toString(), 10) : 1;
    const users = await this.userModel.findAll([{ email }, { name }], (curPage - 1) * 10, 10);
    if (users.length === 0) {
      return {
        status: 'NotFound',
        payload: [],
      };
    }
    return {
      status: 'OK',
      payload: users,
    };
  }

  public async create(user: IUser):
  Promise<ServiceResponse<Omit<IUser, 'password'> | ErrorMessage>> {
    const userEmail = await this.userModel.findOne(undefined, user.email);
    if (userEmail) {
      return {
        status: 'Conflict',
        payload: {
          message: 'User with this email already exists',
        },
      };
    }
    const userCreated = await this.userModel.create(user);
    if (!userCreated) {
      return {
        status: 'BadRequest',
        payload: { message: 'User not created' },
      };
    }
    const { id, name, email } = userCreated;
    return {
      status: 'Created',
      payload: { id, name, email },
    };
  }

  public async update(idToUpdate: number, user: Omit<IUser, 'password'>):
  Promise<ServiceResponse<Omit<IUser, 'password'> | ErrorMessage>> {
    const curUser = await this.userModel.findOne(idToUpdate);
    if (!curUser) {
      return {
        status: 'NotFound',
        payload: { message: 'User not found' },
      };
    }
    const userUpdated = await this.userModel.update(idToUpdate, user as IUser);
    if (!userUpdated) {
      return {
        status: 'BadRequest',
        payload: { message: 'User not updated' },
      };
    }
    const { id, name, email } = userUpdated;
    return {
      status: 'OK',
      payload: { id, name, email },
    };
  }

  public async login(user: IUserLogin):
  Promise<ServiceResponse<IToken | ErrorMessage>> {
    const curUser = await this.userModel.findOne(undefined, user.email);
    if (!curUser) {
      return {
        status: 'NotFound',
        payload: { message: 'User not found' },
      };
    }
    const { id, name, email, password } = curUser;
    if (password !== user.password) {
      return {
        status: 'Unauthorized',
        payload: { message: 'Wrong password' },
      };
    }
    const token = GenerateToken({ id, name, email });
    return {
      status: 'OK',
      payload: { token },
    };
  }
}

export default new UserService();

import { GenerateToken } from '../auth/jwt';
import { HashPassword, VerifyPassword } from '../auth/password';
import UserModel from '../models/user';
import { ErrorMessage, IUser, IUserLogin, ServiceResponse } from '../types';

export interface IToken {
  token: string;
}

const userNotFound = 'User not found';

class UserService {
  private userModel: UserModel;

  constructor(userModel = new UserModel()) {
    this.userModel = userModel;
  }

  private static removePassword(user: IUser): Omit<IUser, 'password'> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  public async getAllUsers(page?: number | string, email?: string, name?: string):
  Promise<ServiceResponse<Omit<IUser, 'password'>[]>> {
    const curPage = ((page && page > 0 ? parseInt(page.toString(), 10) : 1) - 1) * 10;
    const users = await this.userModel.findAll([{ email }, { name }], curPage, 10);
    if (users.length === 0) {
      return {
        status: 'NotFound',
        payload: [],
      };
    }
    const usersWithoutPassword = users.map(UserService.removePassword);
    return {
      status: 'OK',
      payload: usersWithoutPassword,
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
    const newUser = { ...user, password: await HashPassword(user.password) };
    const userCreated = await this.userModel.create(newUser);
    if (!userCreated) {
      return {
        status: 'BadRequest',
        payload: { message: 'User not created' },
      };
    }
    const { id, name, email } = userCreated;
    const token = GenerateToken({ id, name, email });
    return {
      status: 'Created',
      payload: { id, name, email, token },
    };
  }

  public async update(idToUpdate: number, user: Omit<IUser, 'password'>):
  Promise<ServiceResponse<Omit<IUser, 'password'> | ErrorMessage>> {
    const curUser = await this.userModel.findOne(idToUpdate);
    if (!curUser) {
      return {
        status: 'NotFound',
        payload: { message: userNotFound },
      };
    }
    const userEmail = await this.userModel.findOne(undefined, user.email);
    if (userEmail && user.email !== curUser.email) {
      return {
        status: 'Conflict',
        payload: {
          message: 'User with this email already exists',
        },
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
        payload: { message: userNotFound },
      };
    }
    const { id, name, email, password } = curUser;
    if (!await VerifyPassword(user.password, password)) {
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

  public async delete(idToDelete: number):
  Promise<ServiceResponse<Omit<IUser, 'password'> | ErrorMessage>> {
    const userDeleted = await this.userModel.delete(idToDelete);
    if (!userDeleted) {
      return {
        status: 'BadRequest',
        payload: { message: 'User not deleted' },
      };
    }
    const { id, name, email } = userDeleted;
    return {
      status: 'OK',
      payload: { id, name, email },
    };
  }

  public async getUserById(id: number):
  Promise<ServiceResponse<Omit<IUser, 'password'> | ErrorMessage>> {
    const user = await this.userModel.findOne(id);
    if (!user) {
      return {
        status: 'NotFound',
        payload: { message: userNotFound },
      };
    }
    const userWithoutPassword = UserService.removePassword(user);
    return {
      status: 'OK',
      payload: userWithoutPassword,
    };
  }
}

export default new UserService();

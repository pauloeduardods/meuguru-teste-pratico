import UserModel from '../models/user';
import { ErrorMessage, IUser, ServiceResponse } from '../types';

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
}

export default new UserService();

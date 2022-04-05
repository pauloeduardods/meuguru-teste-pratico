import UserModel from '../models/user';
import { IUser, ServiceResponse } from '../types';

class UserService {
  private userModel: UserModel;

  constructor(userModel = new UserModel()) {
    this.userModel = userModel;
  }

  public async getAllUsers(page?: number | string): Promise<ServiceResponse<IUser[]>> {
    const curPage = page && page > 0 ? parseInt(page.toString(), 10) : 1;
    const users = await this.userModel.findAll((curPage - 1) * 10, 10);
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
}

export default new UserService();

import { IUser } from '../../types';

declare global {
  namespace Express {
    interface Request {
      user?: Omit<IUser, 'password'>;
    }
  }
}

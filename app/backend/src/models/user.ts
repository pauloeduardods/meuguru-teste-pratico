import { PrismaClient } from '@prisma/client';
import { IUser } from '../types';

class UserModel {
  private prisma: PrismaClient;

  constructor(prisma = new PrismaClient()) {
    this.prisma = prisma;
  }

  public async create(user: IUser): Promise<IUser | undefined> {
    try {
      const { email, name, password } = user;
      const userCreated = await this.prisma.user.create({
        data: {
          email,
          name,
          password,
        },
      });
      return userCreated;
    } catch (_) {
      return undefined;
    }
  }

  public async findAll(skip = 0, take = 10): Promise<IUser[]> {
    const users = await this.prisma.user.findMany({ skip, take });
    return users;
  }

  public async findOne(id?: number, email?: string): Promise<IUser | undefined> {
    if (!id && !email) {
      return undefined;
    }

    const [user] = await this.prisma.user.findMany({
      where: {
        OR: { id, email },
      },
    });
    return user;
  }
}

export default UserModel;

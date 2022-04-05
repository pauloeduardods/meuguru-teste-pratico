import { PrismaClient } from '@prisma/client';
import { IUser } from '../types';

export interface IFilter {
  email?: string;
  name?: string;
}

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

  public async findAll(filters: IFilter[], skip = 0, take = 10): Promise<IUser[]> {
    const options = {
      skip,
      take,
      where: {
        AND: [
          ...filters,
        ],
      },
    };
    const users = await this.prisma.user.findMany(options);
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

  public async update(id: number, user: IUser): Promise<IUser | undefined> {
    try {
      const userUpdated = await this.prisma.user.update({
        where: { id },
        data: {
          ...user,
        },
      });
      return userUpdated;
    } catch (_) {
      return undefined;
    }
  }
}

export default UserModel;

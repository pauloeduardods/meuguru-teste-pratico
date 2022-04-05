import * as argon2 from 'argon2';

export const HashPassword = async (password: string): Promise<string> =>
  argon2.hash(password, {
    type: argon2.argon2id,
    hashLength: 50,
  });

export const VerifyPassword = async (password: string, hash: string): Promise<boolean> =>
  argon2.verify(hash, password, {
    type: argon2.argon2id,
    hashLength: 50,
  });

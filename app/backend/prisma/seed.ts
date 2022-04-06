/* eslint-disable max-len */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userData = [
  {
    name: 'Paulo Eduardo',
    email: 'pauloeduardods@email.com',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$83gYHBwpysSLIfxz9GqrGWngYlOqucvrk9o/l6JzKHJulqpYf6dE68A7y0IyNXtNbcc', // 76543210
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    password: '$argon2id$v=19$m=16,t=2,p=1$MTIzNDU2Nzg5MTAxMTEy$jQpFrGeFogTQPtS5sbarmbunM/dkDMvRBeBBygesPkHLzM5870EdMEk3UnS/ZuErJdY', // 123456789101112
  },
];

async function main() {
  const arrPromise = userData.map(async (user) =>
    prisma.user.create({
      data: user,
    }));
  return Promise.all(arrPromise);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

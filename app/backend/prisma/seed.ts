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
  {
    name: 'Caetano',
    email: 'caetano@email.com',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
  {
    name: 'Valdir',
    email: 'cabecabranca@email.com',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
  {
  name: 'Luis',
  email: 'cabeeeecabranca@email.com',
  password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
  {
    name: 'Luis com z',
    email: 'luiscomz@email.com',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
  {
    name: 'Luiz com s',
    email: 'luizcoms@email.com',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
  {
    name: 'Ice',
    email: 'olator@email.com',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
  {
    name: 'Anaca',
    email: 'anaca@email.com',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
  {
    name: 'Anacaaa',
    email: 'anacaaaaaaaaaaaa@email.com',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
  {
    name: 'Anacaa',
    email: 'anacaaaaaaaa@email.com',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
  {
    name: 'Anacaaaa',
    email: 'anacaaa@email.com',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
  {
    name: 'Anacaa',
    email: 'anacaaaaaaa@email.com',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
  {
    name: 'Lucas',
    email: 'lucas@email.com',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
  {
    name: 'thiago',
    email: 'thiago@email.com',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
  {
    name: 'claudio',
    email: 'claudio@email.com',
    password: '$argon2id$v=19$m=16,t=2,p=1$MzZpSWFuSEtqY2NCRTNqWA$d6ZSVwyHzINj8MPW0f5BXYJad+zxRKHh4UEHHfNjbwBbiqe+6JnOobyb/c47XapmM8E', // 1234567
  },
];

async function main() {
  for (let i = 0; i < userData.length; i += 1) {
    await prisma.user.create({
      data: userData[i],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

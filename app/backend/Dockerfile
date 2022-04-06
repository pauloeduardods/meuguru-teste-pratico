FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

# RUN npx prisma generate

ENTRYPOINT ["npm", "start"]

EXPOSE ${PORT}

# "prestart": "npx prisma generate && npx prisma migrate dev && npx prisma db seed",
# MeuGuru Teste Pratico

![HOME](https://github.com/pauloeduardods/meuguru-teste-pratico/blob/main/images/home.png?raw=true)
![LOGIN](https://github.com/pauloeduardods/meuguru-teste-pratico/blob/main/images/login.png?raw=true)
## Contexto

O projeto consistia em fazer uma aplicação Full-Stack, onde podemos ler, filtrar, editar e excluir usuarios

Apenas o usuario logado pode editar ou exclui-lo.

## Tecnologias usadas

### Frontend
* Typescript
* ReactJS
* TailwindCSS

### Backend
* Express
* PostgreSQL
* Prisma
* JWT
* Argon2

## Executando a aplicação

### Com Docker

> :warning: É necessario ter o Docker e o Docker-compose instalados para conseguir rodar com docker

- Na pasta raiz do projeto rode o comando `npm run compose:up`

- O site vai estar disponivel em [http://localhost:8080](http://localhost:8080)

- E para parar basta rodar o comando `npm run compose:down`

### Com npm

> :warning: É necessario estar com o PostgreSQL rodando e configurar os `.env` dentro das pastas `/app/backend` e `/app/frontend`, use as ambientes de variaveis que estão dentro de `.env.example` como exemplo

- Na pasta raiz rode `npm install`

- Depois rode `npm start` 

- O site vai estar disponivel em [http://localhost:3000](http://localhost:3000)

## Executar os testes

> Foi testado apenas o backend

- Para rodar os testes rode `npm test` na raiz do projeto

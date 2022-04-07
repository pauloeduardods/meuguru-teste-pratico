import { Page1Users, Page2Users, PauloEduardoUser } from './mocks/User.mock';
import { AxiosClient, Exec } from './utils';

describe('Users', () => {
  jest.setTimeout(30000);
  beforeEach(async () => {
    await Exec('npm run migrate:undo');
  });

  describe('/users', () => {
    describe('GET /users', () => {
      it('should return 10 users with no query params', async () => {
        const result = await AxiosClient.get('/users');
        expect(result.status).toBe(200);
        expect(Page1Users).toEqual(result.data);
      });
      it('Should return the page 1 when queryParams page=1', async () => {
        const result = await AxiosClient.get('/users', { params: { page: 1 } });
        expect(result.status).toBe(200);
        expect(result.data).toEqual(Page1Users);
      });

      it('Should return the page 2 when queryParams page=2', async () => {
        const result = await AxiosClient.get('/users', { params: { page: 2 } });
        expect(result.status).toBe(200);
        expect(result.data).toEqual(Page2Users);
      });

      it('Should return the page 1 when queryParams page=0', async () => {
        const result = await AxiosClient.get('/users', { params: { page: 0 } });
        expect(result.status).toBe(200);
        expect(result.data).toEqual(Page1Users);
      });
      it('Should return the page 1 when queryParams page=-200', async () => {
        const result = await AxiosClient.get('/users', { params: { page: -200 } });
        expect(result.status).toBe(200);
        expect(result.data).toEqual(Page1Users);
      });

      it('Should return the user Paulo Eduardo when queryParams name=Paulo Eduardo', async () => {
        const result = await AxiosClient.get('/users', { params: { name: 'Paulo Eduardo' } });
        expect(result.status).toBe(200);
        expect(result.data).toEqual([PauloEduardoUser]);
      });

      it('Should return the user Paulo Eduardo when queryParams email=pauloeduardods@email.com', async () => {
        const result = await AxiosClient.get('/users', { params: { email: 'pauloeduardods@email.com' } });
        expect(result.status).toBe(200);
        expect(result.data).toEqual([PauloEduardoUser]);
      });

      it('Should return the user Paulo Eduardo when queryParams email=pauloeduardods@email.com && name=Paulo Eduardo', async () => {
        const result = await AxiosClient.get('/users', { params: { email: 'pauloeduardods@email.com', name: 'Paulo Eduardo' } });
        expect(result.status).toBe(200);
        expect(result.data).toEqual([PauloEduardoUser]);
      });

      it('Should return the 404 Status and empty array if dont find any user', async () => {
        const result = await AxiosClient.get('/users', { params: { email: 'xaulinmatadordeporco@email.com', name: 'Xaulin Matador de Porco' } }).catch(error => error);
        expect(result.response.status).toBe(404);
        expect(result.response.data).toEqual([]);
      });
    });

    describe('POST /users', () => {
      it('should return 201 and the user created', async () => {
        const result = await AxiosClient.post('/users', {
          name: 'Paulo Eduardo',
          email: 'iceolatorgelado@gmail.com',
          password: '1234567',
        });
        expect(result.status).toBe(201);
        expect(result.data).toEqual({
          id: expect.any(Number),
          name: 'Paulo Eduardo',
          email: 'iceolatorgelado@gmail.com',
          token: expect.any(String)
        });
      });

      it('should create the user in DB', async () => {
        const result = await AxiosClient.post('/users', {
          name: 'Paulo Eduardo',
          email: 'iceolatorgelado@gmail.com',
          password: '1234567',
        });
        expect(result.status).toBe(201);
        expect(result.data).toEqual({
          id: expect.any(Number),
          name: 'Paulo Eduardo',
          email: 'iceolatorgelado@gmail.com',
          token: expect.any(String)
        });
        const user = await AxiosClient.get(`/users`, { params: { email: result.data.email } });
        expect(user.status).toBe(200);
        expect(user.data).toEqual([{
          id: expect.any(Number),
          name: 'Paulo Eduardo',
          email: 'iceolatorgelado@gmail.com',
        }]);
      });

      it('should return 400 Status if trying to create with invalid email', async () => {
        const { response } = await AxiosClient.post('/users', {
          name: 'Paulo Eduardo',
          email: 'issoaquinaoeumemail',
          password: '1234567',
        }).catch(error => error);
        expect(response.status).toBe(400);
        expect(response.data).toEqual({
          message: "\"email\" must be a valid email"
        });
      });

      it('should return 400 Status if trying to create with password with len 5', async () => {
        const { response } = await AxiosClient.post('/users', {
          name: 'Paulo Eduardo',
          email: 'iceolatorgelado@gmail.com',
          password: '12345',
        }).catch(error => error);
        expect(response.status).toBe(400);
        expect(response.data).toEqual({
          message: "\"password\" length must be at least 6 characters long"
        });
      });

      it('should return 409 Status if trying to create with existing email', async () => {
        const { response } = await AxiosClient.post('/users', {
          name: 'Paulo Eduardo',
          email: 'pauloeduardods@email.com',
          password: '123456',
        }).catch(error => error);
        expect(response.status).toBe(409);
        expect(response.data).toEqual({
          message: "User with this email already exists"
        });
      });

      it('should update user', async () => {
        const { data: { token } } = await AxiosClient.post('/login', {
          email: 'pauloeduardods@email.com',
          password: '1234567'
        });
        const result = await AxiosClient.put('/users', {
          name: 'Paulo Eduardo de Sordi Gomes',
          email: 'pauloedsg@email.com'
        }, {
          headers: {
            Authorization: token,
          }
        });
        expect(result.status).toBe(200);
        expect(result.data).toEqual({
          id: expect.any(Number),
          name: 'Paulo Eduardo de Sordi Gomes',
          email: 'pauloedsg@email.com'
        });
        const user = await AxiosClient.get(`/users`, { params: { email: 'pauloedsg@email.com' } });
        expect(user.status).toBe(200);
        expect(user.data).toEqual([{
          id: expect.any(Number),
          name: 'Paulo Eduardo de Sordi Gomes',
          email: 'pauloedsg@email.com'
        }]);
      });

      it('should update user', async () => {
        const { data: { token } } = await AxiosClient.post('/login', {
          email: 'pauloeduardods@email.com',
          password: '1234567'
        });
        const result = await AxiosClient.patch('/users', {
          name: 'Paulo Eduardo de Sordi Gomes',
        }, {
          headers: {
            Authorization: token,
          }
        });
        expect(result.status).toBe(200);
        expect(result.data).toEqual({
          id: expect.any(Number),
          name: 'Paulo Eduardo de Sordi Gomes',
          email: 'pauloeduardods@email.com'
        });
        const user = await AxiosClient.get(`/users`, { params: { email: 'pauloeduardods@email.com' } });
        expect(user.status).toBe(200);
        expect(user.data).toEqual([{
          id: expect.any(Number),
          name: 'Paulo Eduardo de Sordi Gomes',
          email: 'pauloeduardods@email.com'
        }]);
      });
    });
  });
  describe('/login', () => {
    describe('POST /login', () => {
      it('Should return jwt token when login is valid', async () => {
        const result = await AxiosClient.post('/login', {
          email: 'pauloeduardods@email.com',
          password: '1234567',
        });
        expect(result.status).toBe(200);
        expect(result.data).toHaveProperty('token');
      });

      it('Should return 401 status when login is invalid', async () => {
        const result = await AxiosClient.post('/login', {
          email: 'pauloeduardods@email.com',
          password: '12345678',
        }).catch(error => error);
        expect(result.response.status).toBe(401);
        expect(result.response.data).not.toHaveProperty('token');
        expect(result.response.data).toHaveProperty('message');
        expect(result.response.data.message).toBe('Wrong password');
      });

      it('Should return 401 status when email dont exits', async () => {
        const result = await AxiosClient.post('/login', {
          email: 'pauloeduardodsssss@email.com',
          password: '12345678',
        }).catch(error => error);
        expect(result.response.status).toBe(404);
        expect(result.response.data).not.toHaveProperty('token');
        expect(result.response.data).toHaveProperty('message');
        expect(result.response.data.message).toBe('User not found');
      });

      it('Should return 400 status when email is not valid', async () => {
        const result = await AxiosClient.post('/login', {
          email: 'pauloeduardodsssss',
          password: '12345678',
        }).catch(error => error);
        expect(result.response.status).toBe(400);
        expect(result.response.data).not.toHaveProperty('token');
        expect(result.response.data).toHaveProperty('message');
        expect(result.response.data.message).toBe('\"email\" must be a valid email');
      });

      it('Should return 400 status when password len < 6', async () => {
        const result = await AxiosClient.post('/login', {
          email: 'pauloeduardods@gmail.com',
          password: '12345',
        }).catch(error => error);
        expect(result.response.status).toBe(400);
        expect(result.response.data).not.toHaveProperty('token');
        expect(result.response.data).toHaveProperty('message');
        expect(result.response.data.message).toBe('\"password\" length must be at least 6 characters long');
      });
    });

    describe('POST /login/validate', () => {
      it('Should return 200 status when token is valid', async () => {
        const res = await AxiosClient.post('/login', {
          email: 'pauloeduardods@email.com',
          password: '1234567',
        });
        const result = await AxiosClient.post('/login/validate', {}, {
          headers: {
            authorization: res.data.token,
          },
        });
        expect(result.status).toBe(200);
        expect(result.data).toEqual(PauloEduardoUser);
      });
      it('Should return 401 status when token is missing or invalid', async () => {
        const result1 = await AxiosClient.post('/login/validate', {}, {
          headers: {
            authorization: 'aaaaaaaaa',
          },
        }).catch(error => error);
        const result2 = await AxiosClient.post('/login/validate', {}).catch(error => error);
        expect(result1.response.status).toBe(401);
        expect(result1.response.data).toEqual({ message: "Invalid token" });
        expect(result2.response.status).toBe(401);
        expect(result2.response.data).toEqual({ message: "Token not found" });
      });
    });
  });
});

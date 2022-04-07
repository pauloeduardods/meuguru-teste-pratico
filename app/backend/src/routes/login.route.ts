import express from 'express';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth';
import ValidationMiddleware from '../middlewares/validations';

class LoginRouter {
  public router: express.Router;

  constructor(router = express.Router()) {
    this.router = router;
    this.router.post('/', ValidationMiddleware.validateLogin, UserController.login);
    this.router.post('/validate', AuthMiddleware, UserController.validateUser);
  }
}

export default LoginRouter;

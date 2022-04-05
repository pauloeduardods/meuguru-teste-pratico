import express from 'express';
import UserController from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth';
import ValidationMiddleware from '../middlewares/validations';

class UserRoute {
  public router: express.Router;

  constructor(router = express.Router()) {
    this.router = router;
    this.router.post('/', ValidationMiddleware.validateNewUser, UserController.create);
    this.router.get('/', UserController.getAllUsers);
    this.router.put('/', AuthMiddleware, ValidationMiddleware.validateUpdateUser, UserController.update);
    this.router.patch('/', AuthMiddleware, ValidationMiddleware.validateUpdateUser, UserController.update);
  }
}

export default UserRoute;

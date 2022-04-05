import express from 'express';
import UserController from '../controllers/user.controller';
import ValidationMiddleware from '../middlewares/validations';

class UserRoute {
  public router: express.Router;

  constructor(router = express.Router()) {
    this.router = router;
    this.router.post('/', ValidationMiddleware.validateNewUser, UserController.create);
    this.router.get('/', UserController.getAllUsers);
  }
}

export default UserRoute;

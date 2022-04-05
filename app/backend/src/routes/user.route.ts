import express from 'express';
import UserController from '../controllers/user.controller';

class UserRoute {
  private router: express.Router;

  constructor(router = express.Router()) {
    this.router = router;
    this.router.get('/', UserController.getAllUsers);
  }
}

export default UserRoute;

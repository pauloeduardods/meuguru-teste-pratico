import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import UserRoute from './routes/user.route';

dotenv.config();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.config();
    this.routes();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      res.header('Content-Type', 'application/json');
      next();
    };
    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use('/users', new UserRoute().router);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  }
}

export default App;

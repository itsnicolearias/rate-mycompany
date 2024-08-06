import { Router } from 'express';

class AuthRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  public async config() {

  }
}

const authRouter = new AuthRouter();

export default authRouter.router;

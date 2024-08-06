import { Router } from 'express';
import authController from '../modules/clients/controllers/auth.controller';

class AuthRouter {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  public async config() {
    this.router.post('/register', authController.register)
    this.router.post('/login', authController.login)
    this.router.post('/verify-account', authController.verifyAccount)
    this.router.post('/forgot-password', authController.forgotPassword)
    this.router.post('/enter-new-password', authController.enterPassword)

  }
}

const authRouter = new AuthRouter();

export default authRouter.router;

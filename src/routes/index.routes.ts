import { Router } from 'express';
import AuthRouter from './auth.routes';

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  public async config() {
    this.router.use('/auth', AuthRouter);

  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;

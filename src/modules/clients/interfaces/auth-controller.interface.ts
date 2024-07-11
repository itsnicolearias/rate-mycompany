import { Request, Response, NextFunction } from 'express';

export interface IAuthController {
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  verifyAccount(req: Request, res: Response, next: NextFunction): Promise<void>;
  forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void>
  enterPassword(req: Request, res: Response, next: NextFunction): Promise<void>
}
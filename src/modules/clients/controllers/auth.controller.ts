import { Request, Response, NextFunction } from "express";
import { sendSuccess } from 'express-responses';
import { IAuthController } from "../interfaces/auth-controller.interface";
import AuthService from "../services/auth.service";

class AuthController implements IAuthController {
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await AuthService.Register(req.body);

            return sendSuccess(response);
            
        } catch (error) {
           next(error);
        }
    }
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await AuthService.Login(req.body);

            return sendSuccess(response);
        } catch (error) {
           next(error);
        }
    }
    async verifyAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await AuthService.VerifyAccount(req.body);

            return sendSuccess(response);
            
        } catch (error) {
           next(error);
        }
    }
    async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await AuthService.ForgotPassword(req.body);

            return sendSuccess(response);
            
        } catch (error) {
           next(error);
        }
    }
    async enterPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await AuthService.EnterNewPassword(req.body);

            return sendSuccess(response);
        } catch (error) {
           next(error);
        }
    }

}

export default new AuthController();

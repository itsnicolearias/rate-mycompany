import  Boom  from "@hapi/boom";
import * as bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";

import { IAuthService } from "../interfaces/auth-service.interface";
import { RegisterBody, LoginBody, VerificationBody, ForgotPassword, EnterPassword } from "../types/auth.types";
import { getToken } from "../../../libs/jwt/jwt.utils";

const prisma = new PrismaClient();
class AuthService implements IAuthService {
    public async Register(body: RegisterBody): Promise<any> {
        try {
            
        } catch (error) {
            throw Boom.badRequest(error)
        }
    }

    public async Login(body: LoginBody): Promise<any> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                  email: body.email,
                },
              })

            if (!user){
                throw Boom.notFound('User not exists')
            }

            if (!user.verified){
                throw Boom.badRequest('Please verify your account first')
            }

            const passwordMatch = await bcrypt.compare(body.password.trim(), user.password.trim());

            if(!passwordMatch){
                throw Boom.forbidden('Wrong credentials')
            }

            const token = getToken(user);
            return {
                message: "Login successfully",
                user,
                token
            };
        } catch (error) {
            throw Boom.badRequest(error)
        }
    }

    public async VerifyAccount(body: VerificationBody): Promise<any> {
        try {
            
        } catch (error) {
            throw Boom.badRequest(error)
        }
    }

    public async ForgotPassword(body: ForgotPassword): Promise<any> {
        try {
            
        } catch (error) {
            throw Boom.badRequest(error)
        }
    }
    
    public async EnterNewPassword(body: EnterPassword): Promise<any> {
        try {
            
        } catch (error) {
            throw Boom.badRequest(error)
        }
    }

}

export default new AuthService();
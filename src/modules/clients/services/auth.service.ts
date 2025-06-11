import  Boom  from "@hapi/boom";
import * as bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";

import { IAuthService } from "../interfaces/auth-service.interface";
import { RegisterBody, LoginBody, VerificationBody, ForgotPassword, EnterPassword } from "../types/auth.types";
import { getToken, getVerifyToken } from "../../../libs/jwt/jwt.utils";
import { sendEmail } from "../../../libs/nodemailer/utils";
import { config } from "../../../config/environment.config";

const prisma = new PrismaClient();
class AuthService implements IAuthService {
    public async Register(body: RegisterBody): Promise<any> {
        try {
            // usuario deb ingresar email y contraseña
            // verificar si no existe en la base de datos
            const user = await prisma.user.findFirst({
                where: {
                  email: body.email,
                },
              })

            if (user){
                throw Boom.forbidden('User already exists')
            }
            // storng password

            // crear una suscripion
            const suscription  = await prisma.subscription.create({ data: {}});
            
            
            // crear un usuario
            const newUser  = await  prisma.user.create({
                data: {
                    email: body.email,
                    password: body.password,
                    is_subscription_owner: true,
                    subscription_id: suscription.subscription_id,
                }
            })
            
            // crear token para verificar cuenta
            const verifyToken = getVerifyToken(newUser)

            
            // crear una empresa asociada a ese usuario por defecto
            await prisma.company.create({ data: {}});

            await prisma.user.update({ data: { verify_account_token: verifyToken}, where: {user_id:  newUser.user_id}})
            // usuario debe verificar su correo
            const  link = `${config.urlFront}/verify-account?token=${verifyToken}`;

            await sendEmail({ to: newUser.email, subject: 'Verify your email', text: `<p> Welcome to Rate My Companie, <a href="${link}"> click here</a> to verify your email. </p>`})
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
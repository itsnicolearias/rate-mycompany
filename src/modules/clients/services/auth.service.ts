import  Boom  from "@hapi/boom";
import { IAuthService } from "../interfaces/auth-service.interface";
import { RegisterBody, LoginBody, VerificationBody, ForgotPassword, EnterPassword } from "../types/auth.types";

class AuthService implements IAuthService {
    Register(body: RegisterBody): Promise<any> {
        try {
            
        } catch (error) {
            throw Boom.badRequest(error)
        }
    }

    Login(body: LoginBody): Promise<any> {
        try {
            
        } catch (error) {
            throw Boom.badRequest(error)
        }
    }

    VerifyAccount(body: VerificationBody): Promise<any> {
        try {
            
        } catch (error) {
            throw Boom.badRequest(error)
        }
    }

    ForgotPassword(body: ForgotPassword): Promise<any> {
        try {
            
        } catch (error) {
            throw Boom.badRequest(error)
        }
    }
    
    EnterNewPassword(body: EnterPassword): Promise<any> {
        try {
            
        } catch (error) {
            throw Boom.badRequest(error)
        }
    }

}

export default AuthService;
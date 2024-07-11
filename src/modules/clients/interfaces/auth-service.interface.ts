import { EnterPassword, ForgotPassword, LoginBody, RegisterBody, VerificationBody } from "../types/auth.types";

export interface IAuthService {
    Register(
      body: RegisterBody,
    ): Promise<any>;
  
    Login(
      body: LoginBody,
    ): Promise<any>;
  
    VerifyAccount(
      body: VerificationBody,
    ): Promise<any>;
  
    ForgotPassword(
      body: ForgotPassword,
    ): Promise<any>;

    EnterNewPassword(
        body: EnterPassword,
      ): Promise<any>;
  }
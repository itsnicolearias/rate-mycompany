export type RegisterBody = {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export type LoginBody = {
    email: string,
    password: string
}

export type VerificationBody = {
    token: string 
}

export type ForgotPassword = {
    email: string
}

export type EnterPassword = {
    token: string,
    newPassword: string
}
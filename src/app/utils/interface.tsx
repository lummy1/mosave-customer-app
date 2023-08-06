export type ILogin = {
    email: string,
    password: string
    [key: string]: string
}

export type IRegister = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
    phone: string
    terms: boolean
    [key: string]: string | boolean
}

export type IUser = {
    firstName: string,
    lastName: String,
    email: string,
    image?: {
        url: string | any,
        publicId: string
    }
}

export type IForgotPassword = {
    email: string,
    [key: string]: string
}

export type IPasswordType = {
    [key: string]: string
}

export type IBoolean = {
    [key: string]: boolean
}

export type IString = {
    [key: string]: string
}
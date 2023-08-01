export type ILogin = {
    email: string,
    password: string
}

export type IRegister = {
    firstName: string,
    lastName: String,
    email: string,
    password: string,
    confirmPassword?: string
    image?: string
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
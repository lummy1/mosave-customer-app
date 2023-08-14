export type Props = {
    profile: IProfile,
    fetchProfile(): any
}

export type IAccount = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNo: string,
    role: string,
    department: string,
    country: string,
    city: string,
    address: string
}

export type IPassword = {
    currentPassword: string,
    newPassword: string,
    newConfirmPassword: string,
}

export type IState = {
    mount: boolean
    account: IAccount,
    pass: IPassword,
    image: string,
    countries: Array<any>,
    imageBool: boolean,
    errorMessage: string
    avatar: string
}

export type IProfile = {
    data: any,
    response: any,
    isLoading: boolean,
    isFullLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    message: string
}
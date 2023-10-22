export interface IRegister {
    name: string,
    email: string,
    password: string,
    confirmpassword: string,
}
export interface ILogin {
    email: string,
    password: string
}

export interface IToken {
    name: string,
    id: number
}

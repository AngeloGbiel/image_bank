import {ReactNode} from "react"

export interface IRegister {
    name: string,
    email: string,
    password: string,
    confirmpassword: string,
}
export interface IContextProvider {
    children: ReactNode
}
export interface IContextType{
    registerUser: (user:IRegister) => Promise<void>,
    open: boolean,
    handleClose: (event: React.SyntheticEvent | Event,reason?: string) => void,
    messageError?: {
        message: string
    }
}
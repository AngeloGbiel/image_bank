import { ReactNode } from "react";

export interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}
export interface IContextProvider {
  children: ReactNode;
}
export interface ILogin {
  email: string;
  password: string;
}


export interface IProfile{
  name: string;
  email: string;
  image: string;
}

export interface IContextType {
  registerUser: (user: IRegister) => Promise<void>;
  open: boolean;
  handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
  messageError?: {
    message: string;
  };
  authenticate: boolean;
  loginUser: (user: ILogin) => Promise<void>,
  setSelect: (select:string)=>void
  select: string,
  setSearch: (search:string)=> void
  search: string,
  token: string,
  logout: ()=>void,
  userAuthenticate: object
}

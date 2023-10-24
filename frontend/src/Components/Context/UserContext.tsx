import { createContext } from "react";
import { IContextProvider, IContextType } from "../Types";
import Auth from "./Auth";

const UserContext = createContext<IContextType>({} as IContextType);

const UserProvider = ({ children }: IContextProvider) => {
  const { registerUser, handleClose, open, messageError } = Auth();
  return (
    <UserContext.Provider
      value={{ registerUser, open, handleClose, messageError }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

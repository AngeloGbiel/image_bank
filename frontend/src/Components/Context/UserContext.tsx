import { createContext } from "react";
import { IContextProvider, IContextType } from "../Types";
import Auth from "./Auth";

const UserContext = createContext<IContextType>({} as IContextType);

const UserProvider = ({ children }: IContextProvider) => {
  const {
    registerUser,
    handleClose,
    open,
    messageError,
    authenticate,
    loginUser,
  } = Auth();
  return (
    <UserContext.Provider
      value={{
        registerUser,
        open,
        handleClose,
        messageError,
        authenticate,
        loginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

import { createContext, useState } from "react";
import { IContextProvider, IContextType } from "../Types";
import Auth from "./Auth";

const UserContext = createContext<IContextType>({} as IContextType);

const UserProvider = ({ children }: IContextProvider) => {
  const [search, setSearch] = useState<string>("");
  const {
    registerUser,
    handleClose,
    open,
    messageError,
    authenticate,
    loginUser,
    select,
    setSelect
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
        setSelect,
        setSearch,
        select,
        search
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

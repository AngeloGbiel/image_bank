import { createContext, useState } from "react";
import { IContextProvider, IContextType } from "../Types";
import Auth from "./Auth";

const UserContext = createContext<IContextType>({} as IContextType);

const UserProvider = ({ children }: IContextProvider) => {
  const [editUser, SetEditUser] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("");

  const SetOpenModelEditUser = () => {
    SetEditUser(true);
  };

  const SetCloseModelEditUser = () => {
    SetEditUser(false);
  };


  const {
    registerUser,
    handleClose,
    open,
    messageError,
    authenticate,
    loginUser,
    select,
    setSelect,
    token,
    logout,
    userAuthenticate,
    editUserProfile,
    setMessageError,
    setOpen
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
        search,
        token,
        logout,
        userAuthenticate,
        SetOpenModelEditUser,
        SetCloseModelEditUser,
        editUser,
        editUserProfile,
        setMessageError,
        setOpen
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

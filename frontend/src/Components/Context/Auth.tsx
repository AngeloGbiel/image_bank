// import Api from "../Api/Axios";
import { useState } from "react";
import Api from "../Api/Axios";
import { ILogin, IRegister } from "../Types";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Auth() {
  const [open, setOpen] = useState<boolean>(false);
  const [messageError, setMessageError] = useState();
  const navigate = useNavigate();
  const [authenticate, setAuthenticate] = useState<boolean>(false);
  const [select, setSelect] = useState<string>("home");
  

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    event;
    setOpen(false);
  };

  async function registerUser(user: IRegister) {
    await Api.post("/register", user)
      .then((response) => {
        authUser(response.data); //pega o token enviado pelo backend e manda para o authUser
        navigate("/");
        setSelect('home')
      })
      .catch((err) => {
        setOpen(true);
        setMessageError(err.response.data);
      });
  }
  async function loginUser(user: ILogin) {
    await Api.post("/login", user)
      .then((response) => {
        authUser(response.data);
        navigate("/");
        setSelect('home')
      })
      .catch((err) => {
        setOpen(true);
        setMessageError(err.response.data);
      });
  }

  function authUser(token: string) {
    setAuthenticate(true); //autentica o usuário
    Cookies.set("token", token, { expires: 1 / 24 }); //Salva o token no cookie por 1 hora (1/24 = 1 hr do dia)
  }
  return {
    registerUser,
    handleClose,
    open,
    messageError,
    authenticate,
    loginUser,
    select,
    setSelect
  };
}

// import Api from "../Api/Axios";
import { useEffect, useState } from "react";
import Api from "../Api/Axios";
import { ILogin, IRegister } from "../Types";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Auth() {
  const [open, setOpen] = useState<boolean>(false);
  const [authenticate, setAuthenticate] = useState<boolean>(false);
  const [messageError, setMessageError] = useState();
  const [select, setSelect] = useState<string>("home");
  const [token, setToken] = useState<string>('')
  const [userAuthenticate, setUserAuthenticate] = useState<object>({})
  const navigate = useNavigate();
  
  useEffect(()=>{
    const tokenCookie = Cookies.get('token')
    if(tokenCookie){
      getUserAuthenticate(tokenCookie)
    }
  },[])

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

  async function getUserAuthenticate(token: string){
    Api.get('getuser',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response)=>{
      setToken(token)
      setAuthenticate(true); //autentica o usuário
      setUserAuthenticate(response.data)
    })
  }
  

  function logout(){
    Cookies.remove('token')
    window.location.reload()
  }

  function authUser(token: string) {
    Cookies.set("token", token, { expires: 1 / 24 }); //Salva o token no cookie por 1 hora (1/24 = 1 hr do dia)
    getUserAuthenticate(token)
  }
  return {
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
  };
}

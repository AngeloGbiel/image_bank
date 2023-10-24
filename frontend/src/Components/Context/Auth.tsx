// import Api from "../Api/Axios";
import { useState } from "react";
import Api from "../Api/Axios";
import { IRegister } from "../Types";

export default function Auth() {
  const [open, setOpen] = useState<boolean>(false);
  const [messageError, setMessageError] = useState()

  const handleClose = (event: React.SyntheticEvent | Event,reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    event;
    setOpen(false);
  };

  async function registerUser(user: IRegister) {
    await Api.post("/register", user)
      .then((response) => {
        console.log(response.data);//pega o token
      })
      .catch((err) => {
        setOpen(true);
        setMessageError(err.response.data);
      });
  }
  return { registerUser,handleClose,open,messageError };
}

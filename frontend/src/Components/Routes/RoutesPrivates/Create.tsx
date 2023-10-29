import React, { useState, ChangeEvent } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import styled from "styled-components";
import {
  AppBar,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { UserContext } from "../../Context/UserContext";
import CloseIcon from "@mui/icons-material/Close";
// import { IImageCreate } from "../../Types";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface IUserContextType {
  SetCloseModelEditUser: () => void;
  SetOpenModelEditUser: () => void;
  editUser: boolean;
  setOpen: (open: boolean) => void;
  setMessageError: (messageError: object) => void 
}

const CreateStyled = styled.form`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  input[type="file"] {
    display: none;
  }
  p {
    font-size: 2rem;
  }
  .button {
    width: 10rem;
    height: 3rem;
    border-radius: 20px;
    outline: none;
    border: none;
    background-color: #011722;
    color: white;
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 2px 2px 4px 1px rgba(0, 0, 0, 0.75);
  }
`;

const DialogStyled = styled(Dialog)`
  form {
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 4rem;
    gap: 7rem;
    .info {
      display: flex;
      flex-direction: column;
      gap: 4rem;
      width: 50%;
    }
    .image {
      width: 20%;
      img {
        width: 100%;
        border-radius: 10px;
      }
    }
  }
  .action{
    /* display: flex;
    gap: 10%; */
    button{
      width: 50%;
      height: 3rem;
    }
  }
`;

interface IImageDataProps {
  title: string | null
  description: string | null
  image: File | null
}

export default function Create() {
  const { SetCloseModelEditUser, editUser, SetOpenModelEditUser, setOpen, setMessageError } =
    React.useContext(UserContext) as IUserContextType;
  const [file, setFile] = useState<File | Blob>();
  const [imageData, setImageData] = React.useState<IImageDataProps>({} as IImageDataProps);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event!.target!.files! && event.target.files.length > 0) {
      const file = event.target.files[0];
      const blob = new Blob([file], { type: "text/plain" });
      setFile(blob);
      setImageData({ ...imageData, image: file });
      SetOpenModelEditUser();
      console.log(file);
    }
  };
  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setImageData({ ...imageData, [e.target.name]: e.target.value });
  };
  const SaveFile = () =>{
    if(imageData.title == null){
      setOpen(true)
      setMessageError({message: 'Adcione um título'})
      return
    }
    SetCloseModelEditUser()
    console.log(imageData)
  }
  return (
    <CreateStyled>
      <p>Crie suas próprias postagens aqui</p>
      <label className="button" htmlFor="arquivo">
        Create
      </label>
      <input type="file" id="arquivo" onChange={handleFileChange} />
      <DialogStyled
        fullScreen
        open={editUser}
        onClose={SetCloseModelEditUser}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar style={{ background: "#011722" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={SetCloseModelEditUser}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit
            </Typography>
            <Button autoFocus color="inherit" onClick={SetCloseModelEditUser}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <form>
          <div className="image">
            {file && (
              <img
                src={file ? URL.createObjectURL(file) : ``}
                // width={300}
                alt=""
              />
            )}
          </div>
          <div className="info">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              onChange={(e) => handleUserChange(e)}
            />
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              fullWidth
              name="description"
              onChange={(e) => handleUserChange(e)}
            />
            <div className="action">
              <button onClick={(e)=>{
                e.preventDefault()
                SetCloseModelEditUser()
              }}>Cancelar</button>
              <button onClick={(e)=>{
                e.preventDefault(),
                SaveFile()
              }}>Salvar</button>
            </div>
          </div>
        </form>
      </DialogStyled>
    </CreateStyled>
  );
}

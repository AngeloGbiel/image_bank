import Dialog from "@mui/material/Dialog";
import {
  AppBar,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import React, { useContext } from "react";
import { IImageBankShowProps } from "../Types";
import Api from "../Api/Axios";
import { UserContext } from "../Context/UserContext";
import styled from "styled-components";

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
  .action {
    button {
      width: 50%;
      height: 3rem;
    }
  }
`;

interface IImageDataProps {
  title: string;
  description: string;
  image: File;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IEditImage {
  editImage: boolean;
  setEditImage: (editImage: boolean) => void;
  editImageData: IImageBankShowProps;
}

export default function DialogFullScreen({
  editImage,
  setEditImage,
  editImageData,
}: IEditImage) {
  const { token } = useContext(UserContext);
  const [imageData, setImageData] = React.useState<IImageDataProps>(
    {} as IImageDataProps
  );
  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setImageData({ ...imageData, [e.target.name]: e.target.value });
  };
  const urlImageLocalHost: string = `http://localhost:3000/images/${
    editImageData!.image
  }`;

  const SaveFile = async () => {
    await Api.patch(`/images/edit/${editImageData.id}`, imageData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      console.log("Imagem adcionada");
      window.location.reload();
    });
  };

  return (
    <DialogStyled
      fullScreen
      open={editImage}
      onClose={setEditImage}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar style={{ background: "#011722" }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              window.location.reload();
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Create
          </Typography>
        </Toolbar>
      </AppBar>

      <form>
        <div className="image">
          {urlImageLocalHost && (
            <img
              src={urlImageLocalHost ? urlImageLocalHost : ``}
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
            defaultValue={editImageData.title}
            onChange={(e) => handleUserChange(e)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            fullWidth
            defaultValue={editImageData.description}
            name="description"
            onChange={(e) => handleUserChange(e)}
          />
          <div className="action">
            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
            >
              Cancelar
            </button>
            <button
              onClick={(e) => {
                e.preventDefault(), SaveFile();
              }}
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </DialogStyled>
  );
}

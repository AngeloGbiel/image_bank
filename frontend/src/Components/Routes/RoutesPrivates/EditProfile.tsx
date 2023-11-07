import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { UserContext } from "../../Context/UserContext";
import { IProfile } from "../../Types";
import Profile from "../../../assets/avatar.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Fa from "react-icons/fa";
import * as Md from "react-icons/md";
import * as Bs from "react-icons/bs";
import styled from "styled-components";
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IUserContextType {
  userAuthenticate: IProfile;
  SetCloseModelEditUser: () => void;
  editUser: boolean;
  editUserProfile: (user: IProfile) => Promise<void>;
}

const ModelEditInfoStyled = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  img {
    width: 10rem;
    mix-blend-mode: multiply;
    border-radius: 50%;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 30%;
    .field {
      display: flex;
      border: 1px solid black;
      border-radius: 10px;
      padding: 0 20px;
      /* background-color: #d4d4d4; */
      input {
        border: none;
        color: #000000;
        width: 100%;
        height: 3rem;
        align-items: center;
        border-radius: 10px;
        background: transparent;
        padding-left: 20px;
        font-size: 1.1rem;
        outline: none;
      }
      label {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
      }
    }
    input[type="submit"] {
      display: flex;
      /* margin-top: 18px; */
      width: 100%;
      height: 3rem;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      background: #011722;
      color: #ffffff;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      border: none;
    }
    input[type="file"] {
      display: flex;
      align-items: center;
      padding-top: 14px;
      font-size: 0.8rem;
      color: rgba(51, 51, 51, 0);
    }
  }
`;

export default function EditProfile() {
  const { SetCloseModelEditUser, editUser, userAuthenticate, editUserProfile } =
    React.useContext(UserContext) as IUserContextType;
  const image =
    "image" in userAuthenticate && userAuthenticate.image != null
      ? `https://imagebank-profile-user-s3.s3.amazonaws.com/${userAuthenticate.image}`
      : "";
  const { handleSubmit, register, reset } = useForm<IProfile>();
  const onSubmit: SubmitHandler<IProfile> = async (data: IProfile) => {
    editUserProfile(data);
    reset();
  };
  return (
    <div>
      <Dialog
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
            <Button
              onClickCapture={handleSubmit(onSubmit)}
              autoFocus
              color="inherit"
              onClick={SetCloseModelEditUser}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>

        <ModelEditInfoStyled>
          <img src={image ? image : Profile} alt="Profile" />
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}

            <div className="field">
              <label htmlFor="text">
                <Fa.FaUserAlt />
              </label>
              <input
                type="name"
                id="name"
                placeholder="Name"
                defaultValue={userAuthenticate.name}
                {...register("name")}
              />
            </div>

            {/* Email */}

            <div className="field">
              <label htmlFor="email">
                <Md.MdOutlineMail />
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                defaultValue={userAuthenticate.email}
                {...register("email")}
              />
            </div>

            {/* Image */}

            <div className="field">
              <label htmlFor="image">
                <Bs.BsImageFill />
              </label>
              <input
                type="File"
                id="image"
                placeholder="Image"
                {...register("image")}
              />
            </div>
          </form>
        </ModelEditInfoStyled>
      </Dialog>
    </div>
  );
}

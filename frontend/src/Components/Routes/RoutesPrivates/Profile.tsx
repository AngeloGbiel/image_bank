import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { IProfile } from "../../Types";
import styled from "styled-components";
import ProfileAvatar from "../../../assets/avatar.jpg";
import Banner from "../../../assets/banner.jpg";
import EditProfile from "./EditProfile";

interface IUserContextType {
  userAuthenticate: IProfile;
  SetOpenModelEditUser: () => void;
}

const ProfileStyled = styled.div`
  .banner {
    width: 100%;
    height: 35vh;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .profile {
    position: absolute;
    top: 20rem;
    left: 3rem;
    transform: translate(0, -50%);
    .image {
      width: 10rem;
      img {
        border: 3px solid #011722;
        border-radius: 50%;
      }
    }
    .info {
      h2,
      h4 {
        font-family: Arial, Helvetica, sans-serif;
      }
    }
    .edit {
      font-family: Arial, Helvetica, sans-serif;
      width: 100%;
      height: 2rem;
      margin-top: 0.6rem;
      outline: none;
    }
  }
`;

export default function Profile() {
  const { userAuthenticate, SetOpenModelEditUser } = useContext(
    UserContext
  ) as IUserContextType;
  const image =
    "image" in userAuthenticate && userAuthenticate.image != null
      ? `http://localhost:3000/images/${userAuthenticate.image}`
      : "";
  return (
    <ProfileStyled>
      <div className="banner">
        <img src={Banner} alt="banner" />
      </div>
      <div className="profile">
        <div className="image">
          <img
            style={{ width: "100%" }}
            src={image ? image : ProfileAvatar}
            alt="Profile"
          />
        </div>
        <div className="info">
          <h2>Nome: {userAuthenticate.name}</h2>
          <h4>Email: {userAuthenticate.email}</h4>
        </div>
        <button onClick={SetOpenModelEditUser} className="edit">
          Editar perfil
        </button>
      </div>
      <EditProfile />
    </ProfileStyled>
  );
}

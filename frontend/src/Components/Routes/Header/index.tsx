import styled from "styled-components";
import Logo from "../../../assets/logo.png";
import * as Bi from "react-icons/bi";
import * as Md from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import {
  Avatar,
  Divider,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import Profile from "../../../assets/avatar.jpg";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  .left {
    gap: 1.6rem;
    display: flex;
    align-items: center;
    img {
      width: 3rem;
    }
    div {
      display: flex;
      gap: 1rem;
    }
  }
  .search {
    width: 45%;
    display: flex;
    position: relative;
    input {
      width: 100%;
      height: 2.5rem;
      outline: none;
      border: none;
      border-radius: 28px;
      background: #c5c5c5;
      padding: 8px 15px;
      font-size: 1rem;
    }
    label {
      position: absolute;
      left: 98%;
      top: 64%;
      transform: translate(-100%, -50%);
      color: #00000090;
      font-size: 1.4rem;
      cursor: pointer;
    }
  }
  .rightLogin {
    gap: 0.5rem;
    display: flex;
    align-items: center;
    .profile {
      width: 3rem;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
    .arrowDown{
      cursor: pointer;
    }
  }
  .right {
    gap: 2rem;
    display: flex;
    align-items: center;
    .profile {
      width: 3rem;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
  }

  //fora de div
  .button {
    display: flex;
    font-size: 1.2rem;
    padding: 5px 10px;
    border-radius: 30px;
    transition: 0.5s;
  }
  .select {
    background-color: #011722;
    color: white;
  }
`;

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const { setSearch, search, setSelect, select, authenticate } =
    useContext(UserContext);

  const searchImages = () => {
    if (search) {
      setSearch("");
      navigate(`result/${search}`);
    }
  };

  const AddEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key == "Enter" && search) {
      setSearch("");
      navigate(`result/${search}`);
    }
  };

  return (
    <HeaderStyled>
      {authenticate ? (
        <>
          <div className="left">
            <img src={Logo} alt="Logo" />
            <div>
              {/* Pagina inicial */}

              <div
                className={select === "home" ? "button select" : "button"}
                onClick={() => setSelect("home")}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: select == "home" ? "white" : "black",
                  }}
                  to={"/"}
                >
                  Pagina inicial
                </Link>
              </div>
              {/* Criar */}

              <div
                className={select === "criar" ? "button select" : "button"}
                onClick={() => setSelect("criar")}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: select == "criar" ? "white" : "black",
                  }}
                  to={"/create"}
                >
                  Criar
                </Link>
              </div>
            </div>
          </div>

          {/* Search */}

          <div className="search">
            <input
              id="search"
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={(e) => AddEnter(e)}
            />
            <label htmlFor="search">
              <div onClick={searchImages}>
                <Bi.BiSearchAlt />
              </div>
            </label>
          </div>
          <div className="rightLogin">
            
            {/* Image */}

            <Tooltip className="profile" title="Profile">
              <img src={Profile} alt="Profile" />
            </Tooltip>

            {/* Seta */}
            <div className="arrowDown" onClick={handleClick}>
              <Md.MdOutlineKeyboardArrowDown />
            </div>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem className="profileMenu" onClick={handleClose}>
                <Avatar>
                  <img style={{'width': '100%'}} src={Profile} alt="" />  
                </Avatar> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>My Images</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </>
      ) : (
        <>
          <div className="left">
            <img src={Logo} alt="Logo" />
            <div>
              <div
                className={select === "home" ? "button select" : "button"}
                onClick={() => setSelect("home")}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: select == "home" ? "white" : "black",
                  }}
                  to={"/"}
                >
                  Pagina inicial
                </Link>
              </div>
            </div>
          </div>
          <div className="search">
            <input
              id="search"
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={(e) => AddEnter(e)}
            />
            <label htmlFor="search">
              <div onClick={searchImages}>
                <Bi.BiSearchAlt />
              </div>
            </label>
          </div>
          <div className="right">
            <div
              className={select === "login" ? "button select" : "button"}
              onClick={() => setSelect("login")}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: select == "login" ? "white" : "black",
                }}
                to={"/login"}
              >
                Login
              </Link>
            </div>
            <div
              className={select === "register" ? "button select" : "button"}
              onClick={() => setSelect("register")}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: select == "register" ? "white" : "black",
                }}
                to={"/register"}
              >
                Register
              </Link>
            </div>
          </div>
        </>
      )}
    </HeaderStyled>
  );
};

export default Header;

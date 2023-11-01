import Logo from "../../../assets/logo.png";
import * as Bi from "react-icons/bi";
import * as Md from "react-icons/md";
import * as Bs from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { Avatar, Divider, MenuItem, Tooltip } from "@mui/material";
import Profile from "../../../assets/avatar.jpg";
import { HeaderStyled, MenuStyled } from "./HeaderStyled";

const Header = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);//Evita o erro "A propriedade 'value' não existe no tipo 'never'"
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSelect("");
  };
  const {
    setSearch,
    setSelect,
    select,
    authenticate,
    logout,
    userAuthenticate,
  } = useContext(UserContext);

  const searchImages = () => {
    const searchValue = inputRef!.current!.value; //pegar o valor do input pelo label
    setSearch(searchValue);
    navigate('/')
    setSelect('home')
  };

  const image =
    "image" in userAuthenticate && userAuthenticate.image != null
      ? `http://localhost:3000/images/${userAuthenticate.image}`
      : "";
  const AddEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key == "Enter") {
      setSearch(target.value)
      navigate('/')
      setSelect('home')
    }
  };
  return (
    <HeaderStyled>
      {authenticate ? (
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
                  color: select == "home" ? "white" : "#011722",
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
                  color: select == "criar" ? "white" : "#011722",
                }}
                to={"/create"}
              >
                Criar
              </Link>
            </div>
          </div>
        </div>
      ) : (
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
                  color: select == "home" ? "white" : "#011722",
                }}
                to={"/"}
              >
                Pagina inicial
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search */}

      <div className="search">
        <input
          id="search"
          type="text"
          ref={inputRef}
          placeholder="Search"
          // onChange={(e) => setSearch(e.target.value)}
          // value={search}
          onKeyDown={(e) => AddEnter(e)}
        />
        <label htmlFor="search">
          <div onClick={searchImages}>
            <Bi.BiSearchAlt />
          </div>
        </label>
      </div>

      {authenticate ? (
        <div className="rightLogin">
          {/* Image */}

          <Tooltip
            onClick={() => setSelect("")}
            className="profile"
            title="Profile"
          >
            <Link to={"/profile"}>
              <img src={image != "" ? image : Profile} alt="Profile" />
            </Link>
          </Tooltip>

          {/* Seta */}
          <div className="arrowDown" onClick={handleClick}>
            <Md.MdOutlineKeyboardArrowDown />
          </div>
          <MenuStyled
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem className="profileMenu" onClick={handleClose}>
              <Link className="LinkProfileMenu" to={"/profile"}>
                <Avatar>
                  <img
                    style={{ width: "100%" }}
                    src={image ? image : Profile}
                    alt="Profile"
                  />
                </Avatar>{" "}
                Profile
              </Link>
            </MenuItem>
            <Divider />
            <Link to={"/myimages"}>
              <MenuItem className="option" onClick={handleClose}>
                <Bs.BsImages />
                My images
              </MenuItem>
            </Link>
            <MenuItem className="option" onClick={logout}>
              <Bi.BiLogOut />
              Logout
            </MenuItem>
          </MenuStyled>
        </div>
      ) : (
        <div className="right">
          <div
            className={select === "login" ? "button select" : "button"}
            onClick={() => setSelect("login")}
          >
            <Link
              style={{
                textDecoration: "none",
                color: select == "login" ? "white" : "#011722",
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
                color: select == "register" ? "white" : "#011722",
              }}
              to={"/register"}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </HeaderStyled>
  );
};

export default Header;

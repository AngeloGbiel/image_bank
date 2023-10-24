import styled from "styled-components";
import Logo from "../../../assets/logo.png";
import * as Bi from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  .left {
    gap: 1.6rem;
    display: flex;
    align-items: center;
    img {
      width: 2.5rem;
    }
    div {
      display: flex;
      gap: 1rem;
    }
  }
  .search {
    width: 40%;
    display: flex;
    position: relative;
    input {
      width: 100%;
      outline: none;
      border: none;
      border-radius: 28px;
      background: #c5c5c5;
      padding: 8px 15px;
    }
    label {
      position: absolute;
      left: 98%;
      top: 64%;
      transform: translate(-100%, -50%);
      font-size: 1.4rem;
      cursor: pointer;
    }
  }
  .right {
    gap: 2rem;
    display: flex;
    align-items: center;
  }

  //fora de div
  .button {
    display: flex;
    font-size: 1rem;
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
  const navigate = useNavigate();
  const [select, setSelect] = useState<string>("home");
  const [search, setSearch] = useState<string>("");

  const searchImages = () =>{
    if(search){
        setSearch("");
        navigate(`result/${search}`);
    }
  }

  const AddEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key == "Enter" && search) {
      setSearch("");
      navigate(`result/${search}`);
    }
  };

  return (
    <HeaderStyled>
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
    </HeaderStyled>
  );
};

export default Header;

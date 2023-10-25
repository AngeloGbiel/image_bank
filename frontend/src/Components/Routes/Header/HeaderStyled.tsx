import { Menu } from "@mui/material";
import styled from "styled-components";

export const HeaderStyled = styled.div`
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

export const MenuStyled = styled(Menu)`
    .LinkProfileMenu, .option{
        display: flex;
        gap: 1rem;
        align-items: center;
        color: black;
    }
`

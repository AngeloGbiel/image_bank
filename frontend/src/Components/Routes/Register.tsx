import styled from "styled-components";
import Profile from "../../assets/avatar.jpg";
import * as Fa from "react-icons/fa";
import * as Md from "react-icons/md";
import * as Ai from "react-icons/ai";
import * as Ri from "react-icons/ri";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegister } from "../Types";
import { Button, IconButton, Snackbar } from "@mui/material";


const RegisterStyled = styled.div`
  /* background-color: red; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  gap: 1rem;
  img {
    width: 6rem;
    mix-blend-mode: multiply;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
  }
  span {
    color: #d93025;
    font-size: 16px;
    margin-top: 3px;
    text-align: center;
    margin-top: -10px;
  }
`;

const Register = () => {
  const {
    reset,
    handleSubmit,
    register,
  } = useForm<IRegister>();
  const onSubmit: SubmitHandler<IRegister> = async (data: IRegister) => {
    reset();
    console.log(data);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={()=>''}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={()=>''} //handleclose
      >
        {/* <CloseIcon fontSize="small" /> */}
      </IconButton>
    </>
  );

  return (
    <RegisterStyled>
        <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={()=>''}
            message="Mensagem de erro"
            action={action}
        />
      <img src={Profile} alt="" />
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* name */}

        <div className="field">
          <label htmlFor="name">
            <Fa.FaUserAlt />
          </label>
          <input
            type="text"
            id="name"
            placeholder="Username"
            {...register('name')}
          />
        </div>
        
        {/* email */}

        <div className="field">
          <label htmlFor="email">
            <Md.MdOutlineMail/>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register('email')}
          />
        </div>

        {/* password */}

        <div className="field">
          <label htmlFor="password">
            <Ai.AiFillLock/>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register('password')}
          />
        </div>

        {/* confirmPassword */}

        <div className="field">
          <label htmlFor="confirmPassword">
            <Ri.RiLockPasswordFill/>
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Password"
            {...register('confirmPassword')}
          />
        </div>
        <input type="submit" value="Register" />
      </form>
    </RegisterStyled>
  );
};
export default Register;

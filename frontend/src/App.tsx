import { Outlet, useNavigate } from "react-router-dom";
import { CSSreset } from "./Components/CSSreset";
import Header from "./Components/Routes/Header";
import { useEffect } from "react";
import {UserProvider} from "./Components/Context/UserContext";
import Message from "./Components/Utils/Message";

export default function App(){
    const navigate = useNavigate()
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(()=>{
        navigate('/')
    },[])
    return(
        <UserProvider>
            <CSSreset/>
            <Header/>
            <Message/>
            <Outlet/>
        </UserProvider>
    )
}
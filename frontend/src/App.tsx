import { Outlet, useNavigate } from "react-router-dom";
import { CSSreset } from "./Components/CSSreset";
import Header from "./Components/Routes/Header";
import { useEffect } from "react";

export default function App(){
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/')
    },[])
    return(
        <>
            <CSSreset/>
            <Header/>
            <Outlet/>
        </>
    )
}
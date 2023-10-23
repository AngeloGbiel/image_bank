import { Outlet } from "react-router-dom";
import { CSSreset } from "./Components/CSSreset";
import Header from "./Components/Routes/Header";

export default function App(){
    return(
        <>
            <CSSreset/>
            <Header/>
            <Outlet/>
        </>
    )
}
import { useContext } from "react"
import { UserContext } from "../../../Context/UserContext"
import NotAuth from "../../NotAuth"
import MyImage from "../MyImages"

export default function MyImagePrivate(){
    const {authenticate} = useContext(UserContext)
    return(
        <>
            {authenticate ? (<MyImage/>) : (NotAuth)}
        </>
    )
}
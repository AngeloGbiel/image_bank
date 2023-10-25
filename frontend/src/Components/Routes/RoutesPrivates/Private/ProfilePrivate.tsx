import { useContext } from "react"
import { UserContext } from "../../../Context/UserContext"
import NotAuth from "../../NotAuth"
import Profile from "../Profile"

export default function ProfilePrivate(){
    const {authenticate} = useContext(UserContext)
    return(
        <>
            {authenticate ? (<Profile/>) : (NotAuth)}
        </>
    )
}
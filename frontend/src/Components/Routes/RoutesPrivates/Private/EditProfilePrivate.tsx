import { useContext } from "react"
import { UserContext } from "../../../Context/UserContext"
import NotAuth from "../../NotAuth"
import EditProfile from "../EditProfile"

export default function EditProfilePrivate(){
    const {authenticate} = useContext(UserContext)
    return(
        <>
            {authenticate ? (<EditProfile/>) : (NotAuth)}
        </>
    )
}
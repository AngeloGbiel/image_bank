import { useContext } from "react"
import { UserContext } from "../../../Context/UserContext"
import Create from "../Create"
import NotAuth from "../../NotAuth"

export default function CreatePrivate(){
    const {authenticate} = useContext(UserContext)
    return(
        <>
            {authenticate ? (<Create/>) : (<NotAuth/>)}
        </>
    )
}
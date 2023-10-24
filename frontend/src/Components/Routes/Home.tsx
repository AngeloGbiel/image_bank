import { useParams } from "react-router-dom";

const Home = () =>{
    const { id } = useParams()
    console.log(id)
    return(
        <>
            {id ? (
                <p>{id}</p>
            ): (
                <p>home</p>
            )}
        </>
    )
}
export default Home;
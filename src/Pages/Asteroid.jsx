import {useParams} from "react-router-dom";

export const Asteroid = ()=>{
    const {id} = useParams();

    return <div>{`Asteroid page ${id}`}</div>
}
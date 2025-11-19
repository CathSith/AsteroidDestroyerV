import {useContext} from "react";
import {Header} from "../Components/Header/Header";
import {AsteroidCard} from "../Components/AsteroidCard/AsteroidCard";
import {AsteroidContext} from "../Components/AsteroidCard/AsteroidCardContent/AsteroidContext";


export const Destroy = () =>{

    const {destroyment} = useContext(AsteroidContext)
    return <div>
        <Header/>
        {destroyment.map(item=><AsteroidCard key={item.id} {...item}/>)}
    </div>
}
import React from "react";
import { LinkForm } from './LinkForm';

//importamos db firebase
import {db} from "../firebase"
//necesitamos esto para acceder a las colleciones
import { collection, addDoc } from "firebase/firestore";

export const Links = () =>{

    //añadir un link
    const addOrEditLink = async (linkObject) =>{
        await addDoc(collection(db, "links"), linkObject);
        console.log("new link added");
    }

    return <div>
        <LinkForm addOrEditLink = {addOrEditLink}/>
        <h1>Links</h1>
    </div>;
};
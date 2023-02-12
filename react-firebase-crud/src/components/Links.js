import React from "react";
import { LinkForm } from './LinkForm';
//useeffect para cuando cargue el componente hacer la peticion de los links
import { useEffect } from "react";
import { useState } from "react";

//importamos db firebase
import {db} from "../firebase"
//necesitamos esto para acceder a las colleciones
import { collection, addDoc } from "firebase/firestore";
//traemos getDocs
import { getDocs } from "firebase/firestore";
//onSnapshot para escuchar cambios en tiempo real
import { onSnapshot } from "firebase/firestore";

export const Links = () =>{

    const [links, setLinks] = useState([]);

    //añadir un link
    const addOrEditLink = async (linkObject) =>{
        await addDoc(collection(db, "links"), linkObject);
        console.log("new link added");
    }

    //obtener links
    const getLinks = async () => {
        onSnapshot(collection(db, "links"), (querySnapshot) => {
        const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({...doc.data(), id:doc.id})
          });
          setLinks(docs);
        });
      };

    //
    useEffect(() => {
        getLinks();
    }, []);

    return <div>
        <div className="col-md-4 p-2">
            <LinkForm addOrEditLink = {addOrEditLink}/>
        </div>
        <div className="col-md-8 p-2">
            {links.map(link => (
                <div className="card mb-1">
                    <div className="card-body">
                    <h4>{link.name}</h4>
                    <h4>{link.description}</h4>
                    <a href={link.url} target="_blank">Go to website</a>
                </div>
                </div>
            ))}
        </div>

    </div>;
};
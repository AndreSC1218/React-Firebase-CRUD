import React from "react";
import { LinkForm } from './LinkForm';
//useeffect para cuando cargue el componente hacer la peticion de los links
import { useEffect } from "react";
import { useState } from "react";

//importamos db firebase
import {db} from "../firebase"
//necesitamos esto para acceder a las colleciones
import { collection, addDoc } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
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

    //eliminar link
    const onDeleteLink = async (linkId) =>{
        //pediremos una confirmacion
        if(window.confirm("are you sure you want to delete this link?")){
            await deleteDoc(doc(db, "links", linkId));
            console.log("link deleted");
        }
        
    };


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
                <div className="card mb-1" key={link.id}>
                    <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h4>{link.name}</h4>
                        <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                    </div>
                    <p>{link.description}</p>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">Go to website</a>
                </div>
                </div>
            ))}
        </div>

    </div>;
};
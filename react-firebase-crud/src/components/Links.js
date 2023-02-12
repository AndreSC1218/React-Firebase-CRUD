import React from "react";
import { LinkForm } from './LinkForm';
//useeffect para cuando cargue el componente hacer la peticion de los links
import { useEffect } from "react";
import { useState } from "react";

//para los toast
import { toast } from "react-toastify";

//importamos db firebase
import {db} from "../firebase"
//necesitamos esto para acceder a las colleciones
import { collection, addDoc } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { setDoc } from 'firebase/firestore';
import { updateDoc } from "firebase/firestore";
//traemos getDocs
import { getDocs } from "firebase/firestore";
//onSnapshot para escuchar cambios en tiempo real
import { onSnapshot } from "firebase/firestore";

export const Links = () =>{

    

    const [links, setLinks] = useState([]);
    
    const [currentId, setCurrentId] = useState('');

    //añadir o editar un link
    const addOrEditLink = async (linkObject) =>{
    
        if (currentId === ''){
            await addDoc(collection(db, "links"), linkObject);
        toast('New Link Added',{
            type: 'success'
        })
        }else{
            await updateDoc(doc(db, "links", currentId), linkObject);
            toast('Link Updated Successfully',{
                type: 'info'
            });
            setCurrentId('');
        }
    }

    //eliminar link
    const onDeleteLink = async (linkId) =>{
        //pediremos una confirmacion
        if(window.confirm("are you sure you want to delete this link?")){
            //si nos dice que "si" elimianos el link y si "no" no haremos nada 
            await deleteDoc(doc(db, "links", linkId));
            toast('Link Removed Successfully',{
                type: 'error'
            })
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
        <div className="col p-2">
            <LinkForm {...{addOrEditLink, currentId, links}}/>
        </div>
        <div className="col p-2">
            {links.map(link => (
                <div className="card mb-1" key={link.id}>
                    <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h4>{link.name}</h4>
                        <div>
                        <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                        <i className="material-icons" onClick={()=>setCurrentId(link.id)}>create</i>
                        </div>
                    </div>
                    <p>{link.description}</p>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">Go to website</a>
                </div>
                </div>
            ))}
        </div>

    </div>;
};
import React, { useState } from "react";

//crearemos el formulario
//recibe un props de Links
export const LinkForm = (props) =>{

    //datos del componente
    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    };

    const [values, setValues] = useState(initialStateValues);

    //maneja el cambio del input
    const handleInputChange = e =>{
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    }


    //controlaremos el formulario
    const handleSubmit = e =>{
        //para que no refrescar la pagina
        e.preventDefault();
        //se guardan los datos
        props.addOrEditLink(values);
        //
        setValues({...initialStateValues})

    }

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group p-1">
                <div className="input-group-text bg-light">
                    <i class="material-icons">insert_link</i>
                </div>
                <input onChange={handleInputChange} type="text" className="form-control" placeholder="https://someurl.com" name="url" value={values.url}/>
            </div>
            <div className="form-group input-group p-1">
                <div className="input-group-text bg-light">
                <i class="material-icons">create</i>
                </div>
                <input onChange={handleInputChange} type="text" className="form-control" name="name" placeholder="website name" value={values.name}/>                
            </div>
            <div>
                <div className="form-group p-1">
                    <textarea onChange={handleInputChange} name="description" rows="3" className="form-control" placeholder="write a description" value={values.description}/>
                </div>
            </div>
            <button className="btn btn-primary btn-block p-1">
                save
            </button>
        </form>
    )
};
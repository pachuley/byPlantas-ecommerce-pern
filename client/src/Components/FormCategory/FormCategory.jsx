import React, {useState} from 'react';
import styles from './formCategory.module.css';
import axios from 'axios';
const {REACT_APP_BACKEND_URL} = process.env;

export default function FormCategory (){
    const [category, setCategory] = useState({name: '', description: ''})

    const handleChange = e => {
        setCategory({
            ...category,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        axios.post(`${REACT_APP_BACKEND_URL}/products/category`, category)//variable del .env
        .then(resp=>{console.log(resp)})
        .catch(err=>{console.log(err)})
    }

    return(
        <div className='container'>
            <h2>Agregar Una Categoría</h2>
            <form className={` w-25 py-3 needs-validation mx-auto`} onSubmit={handleSubmit, ()=>alert('Categoria Agregada')} novalidate>
                <label htmlFor='inputNameCategory' className='form-label'>Nombre</label>
                <input 
                    id='inputNameCategory' 
                    name='name' 
                    className='form-control' 
                    type='text' 
                    placeholder='Ingrese Nombre' 
                    value={category.name} 
                    onChange={handleChange} 
                    required/>
                <label htmlFor='inputDescriptionCategory' className='form-label'>Descripción</label>
                <textarea 
                    id='inputDescriptionCategory' 
                    name='description' 
                    className='form-control' 
                    rows="3" 
                    placeholder='Ingrese Descripción' 
                    value={category.description} 
                    onChange={handleChange} 
                    required/>
                <button className='btn btn-primary mt-2 mb-3' type='submit'>Agregar</button>
            </form>
        </div>
    )
}

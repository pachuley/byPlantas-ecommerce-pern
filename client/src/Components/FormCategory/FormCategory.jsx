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
        <div className={styles.dadDiv}>
            <h2>Agregar Una Categoria</h2>
            <form onSubmit={handleSubmit}>
                <input name='name' type='text' placeholder='Nombre...' value={category.name} onChange={handleChange}/>
                <br />
                <textarea name='description' placeholder='Descripcion...' value={category.description} onChange={handleChange}/>
                <br />
                <button type='submit'>Agregar</button>
            </form>
        </div>
    )
}

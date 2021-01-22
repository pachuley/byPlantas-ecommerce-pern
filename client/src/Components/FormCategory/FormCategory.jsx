import React, {useState} from 'react';
import styles from './formCategory.module.css';
import axios from 'axios';

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
        axios.post(`http://localhost:3001/products/category`, category)//cambiar el puerto a la variable 'PORT_API'
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

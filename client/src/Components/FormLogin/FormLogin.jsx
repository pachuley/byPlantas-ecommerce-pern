import React, {useState} from 'react';
import axios from 'axios';
const {REACT_APP_BACKEND_URL} = process.env;

export default function FormLogin (){
    const [user, setUser] = useState({email: '', password: ''})
    const [valid, setValid] = useState(false)

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const emailPattern = new RegExp(/[A-Za-z0-9_.]+\@\w+\.\w\w+/, 'i'); //valida que tenga un '@' seguido de un string seguido de '.' seguido por lo menos 2 caracteres
    const passwordPattern = new RegExp(/[A-Za-z0-9_.]{8,}/, 'i'); //valida que tengo por lo menos 8 caracteres
    const handleSubmit = e => {
        e.preventDefault()
        console.log()
        if(!emailPattern.test(user.email)){
            alert('Email Invalido')
        }else if(!passwordPattern.test(user.password)){
            alert('Contraseña Invalida')
        }else{
            axios.post(`${REACT_APP_BACKEND_URL}/users/login`, user)
            .then(resp=>{console.log(resp)
                user.email === "admin@admin.com" ? localStorage.setItem('admin', 'true') : localStorage.setItem('admin', 'false')
            })
            .catch(err=>{console.log(err)})
        }
        
    }

    return (
        <div className='container col-md-6 justify-content-center'>
            <form className={` w-50 py-3 needs-validation mx-auto`} onSubmit={handleSubmit}>
                <h4 className={`text-center pb-4`}>Ingresa a tu cuenta!</h4>
                <label htmlFor='inputEmailUser' className='form-label'>Escribe tu Email</label>
                <input 
                    id='inputEmailUser' 
                    name='email' 
                    className='form-control' 
                    type='email' 
                    placeholder='Email...' 
                    value={user.email} 
                    onChange={handleChange} 
                    required/>
                <label htmlFor='inputUserPassword' className='form-label'>Escribe tu Contraseña</label>
                <input 
                    id='inputUserPassword' 
                    name='password' 
                    className='form-control' 
                    type='password' 
                    placeholder='Password' 
                    value={user.password} 
                    onChange={handleChange} 
                    required/>
                <button className='btn btn-primary mt-2 mb-3 my-auto' type='submit'>Ingresa</button>
            </form>
        </div>
    )
}
import React, {useState} from 'react';
import axios from 'axios';
import styles from './formlogin.module.css'
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import {useFormik} from 'formik'
const {REACT_APP_BACKEND_URL} = process.env;

const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Email inválido';
    }
    if (!values.password) {
        errors.password = 'Password es requerida';
    }else if (values.password.length < 5) {
        errors.password = 'Al menos debe tener 5 caracteres';
      }
  
    return errors;
  };

export default function FormLogin (){
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validate,
        onSubmit: values => {
            axios.post(`${REACT_APP_BACKEND_URL}/users/login`, values)
            .then(resp=>{
                values.email === "admin@admin.com" ? localStorage.setItem('admin', 'true') : localStorage.setItem('admin', 'false')
                changeLogin(resp.data.userId)
                Swal.fire({
                    title: `${resp.data.message}`,
                    icon: 'info'
                  })
                
                window.location.reload();
            })
            .catch(err=>{console.log(err)})

    }
      })


    const changeLogin = (userId) => {
        const dataLogin = {userId: userId}
        localStorage.setItem('Login', JSON.stringify(dataLogin))
    }

    return (
        <div className='container col-md-6 justify-content-center'>
            <form className={` w-50 py-3 needs-validation mx-auto`} onSubmit={formik.handleSubmit}>
                <h4 className={`${styles.titles}`}>Ingresa a tu cuenta!</h4>
                <label htmlFor='inputLoginEmail' className='form-label'>Escribe tu Email</label>
                <input 
                    id='inputLoginEmail' 
                    name='email' 
                    className='form-control' 
                    type='email' 
                    placeholder='Email...' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    />
                     {formik.errors.email && formik.touched.email ? <p className="my-2 error">{formik.errors.email}</p> : null}

                <label htmlFor='inputLoginPassword' className='form-label'>Escribe tu Contraseña</label>
                <input 
                    id='inputLoginPassword' 
                    name='password' 
                    className='form-control' 
                    type='password' 
                    placeholder='Password' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ? <p className="my-2 error">{formik.errors.password}</p> : null}
                <button 
                    className={`btn mt-2 mb-3 my-auto btnByPlantas`} 
                    type='submit'
                    disabled={Object.keys(formik.errors).length > 0}
                    >
                        Ingresa
                </button>
            </form>
        </div>
    )
}
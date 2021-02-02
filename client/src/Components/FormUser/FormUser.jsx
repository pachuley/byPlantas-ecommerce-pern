import React, {useState} from 'react';
import axios from 'axios';
import styles from './formuser.module.css'
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

    if(!values.password2){
        errors.password2 = 'Password es requerida';
    }else if (values.password2 !== values.password) {
        errors.password = 'No coinciden las contraseñas';
    }
  
    return errors;
  };

export default function FormUser (){

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          password2: ''
        },
        validate,
        onSubmit: values => {
            axios.post(`${REACT_APP_BACKEND_URL}/users/register`, values)
            .then(resp=>{
                Swal.fire({
                    title: 'Se registro correctamente',
                    icon: 'success'
                })
            })
            .catch(err=>{console.log(err)})
    }
      })


    return (
        <div className='container col-md-6 justify-content-center'>
            <form className={` w-50 py-3 needs-validation mx-auto`} onSubmit={formik.handleSubmit}>
                <h4 className={`${styles.titles}`}>Registra tus datos!</h4>
                <label htmlFor='inputEmailUser' className='form-label'>Ingresa un Email</label>
                <input 
                    id='inputEmailUser' 
                    name='email' 
                    className='form-control' 
                    type='email' 
                    placeholder='Email...' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    />
                {formik.errors.email && formik.touched.email ? <p className="my-2 error">{formik.errors.email}</p> : null}

                <label htmlFor='inputUserPassword' className='form-label'>Ingresa una Contraseña</label>
                <input 
                    id='inputUserPassword' 
                    name='password' 
                    className='form-control' 
                    type='password' 
                    placeholder='Password' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ? <p className="my-2 error">{formik.errors.password}</p> : null}

                <label htmlFor='inputUserPassword2' className='form-label'>Reingresa la Contraseña</label>
                <input 
                    id='inputUserPassword2' 
                    name='password2' 
                    className='form-control' 
                    type='password' 
                    placeholder='Password...' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password2}
                    />
                {formik.errors.password2 && formik.touched.password2 ? <p className="my-2 error">{formik.errors.password2}</p> : null}

                <button 
                    className={`btn btnByPlantas mt-2 mb-3 my-auto`} 
                    type='submit'
                    disabled={Object.keys(formik.errors).length > 0}
                >
                        Registrate</button>
            </form>
        </div>
    )
}
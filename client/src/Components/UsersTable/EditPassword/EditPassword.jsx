import axios from 'axios';
import Swal from 'sweetalert2'
import React, {Fragment, useState, useEffect} from 'react'
import { useFormik } from 'formik';
const {REACT_APP_BACKEND_URL} = process.env;

const validate = values =>{
    const errors = {}
    if (!values.password) {
        errors.password = 'Contraseña requerida';
    }else if (values.password.length < 8) {
        errors.password = 'Al menos debe tener 8 caracteres';
    }

    if(!values.password2){
        errors.password2 = 'Contraseña requerida';
    }else if (values.password2 !== values.password) {
        errors.password = 'No coinciden las contraseñas';
    }
    return errors;
}

const EditPassword = ({userId}) => {

    let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))
    let config = {
        headers: {
        'Content-Type': 'application/json',
        'token': userLocalstorage !== null ? userLocalstorage.token : null
        },
    };

    const formik = useFormik({
        initialValues:{
            password: '',
            password2: '',
        },
        validate,
        onSubmit:(values)=>{
            const body = {...values}
            axios.put(`${REACT_APP_BACKEND_URL}/users/${userId}/changepassword`, body, config)
            .then(resp=>{
                if(resp.status === 200){
                    Swal.fire({
                        title: 'Buen Trabajo',
                        text: 'Se cambio la contraseña correctamente',
                        icon: 'success'
                    })
                }else{
                    Swal.fire({
                        title: 'Algo Salio Mal',
                        text: 'Puede que la contraseña no se haya cambiado correctamente',
                        icon: 'error'
                    })
                }
            })
        }
    })

    return (
        <>
            <button type="button" className="btn btnByPlantas" data-toggle="modal" data-target={`#editPass${userId}`}>
            Cambiar
            </button>

            <div className="modal" id={`editPass${userId}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title text-body">Editar Contraseña</h4>
                            <button type="button" className="close btn btn-light" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <form className="mx-auto w-50 py-3" onSubmit={formik.handleSubmit}>
                                <label className='text-body'>Contraseña</label>
                                <input 
                                type="password"
                                name="password"
                                className="form-control mb-2"
                                placeholder="Ingrese una Contraseña"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                />
                                {formik.errors.password && formik.touched.password ? <p className="my-2 error">{formik.errors.password}</p> : null}

                                <label className='text-body'>Repita La Contraseña</label>
                                <input
                                type='password'
                                name='password2'
                                className="form-control mb-2"
                                placeholder='Reingresa la Contraseña' 
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password2}
                                />
                                {formik.errors.password2 && formik.touched.password2 ? <p className="my-2 error">{formik.errors.password2}</p> : null}
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button
                                disabled={(Object.keys(formik.errors).length > 0) || !formik.touched.password}
                                type="submit" 
                                className="btn btnByPlantas" 
                                data-dismiss="modal"
                                onClick={formik.handleSubmit}
                                >
                                Editar
                            </button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPassword;
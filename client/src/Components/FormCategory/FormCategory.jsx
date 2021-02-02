import React, {useState} from 'react';
import styles from './formCategory.module.css';
import Swal from 'sweetalert2'
import axios from 'axios';
import {useFormik} from 'formik'
const {REACT_APP_BACKEND_URL} = process.env;

const validate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Nombre de la categoría es requerida';
    } else if (values.name.length < 5) {
        errors.name = 'Al menos debe tener 5 caracteres';
    }

    if (!values.description) {
        errors.description = 'Descripción de la categoría es requerida';
      }
  
    return errors;
  };

export default function FormCategory (){
    
    const formik = useFormik({
        initialValues: {
          name: '',
          description: '',
        },
        validate,
        onSubmit: values => {
            axios.post(`${REACT_APP_BACKEND_URL}/products/category`, values)//variable del .env
        .then(resp=>{
            Swal.fire({
                title: `Se agrego categoria: ${values.name}`,
                icon: 'success'
            })
            values.name=''
            values.description=''
        })
        .catch(err=>{console.log(err)})
        }
      })

    return(
        <div className='container'>
            <form className={` w-50 py-3 needs-validation mx-auto`} onSubmit={formik.handleSubmit}>
                <h2 className={`text-center`}>Agregar Una Categoría</h2>
                <label htmlFor='inputNameCategory' className='form-label'>Nombre</label>
                <input 
                    id='inputNameCategory' 
                    name='name' 
                    className='form-control' 
                    type='text' 
                    placeholder='Ingrese Nombre' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    />
                    {formik.errors.name && formik.touched.name ? <p className="my-2 error">{formik.errors.name}</p> : null}

                <label htmlFor='inputDescriptionCategory' className='form-label'>Descripción</label>
                <textarea 
                    id='inputDescriptionCategory' 
                    name='description' 
                    className='form-control' 
                    rows="3" 
                    placeholder='Ingrese Descripción' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    />
                   {formik.errors.description && formik.touched.description ? <p className="my-2 error">{formik.errors.description}</p> : null}
                <button 
                    className='btn btnByPlantas mt-2 mb-3' 
                    type='submit'
                    disabled={Object.keys(formik.errors).length > 0}
                    >
                        Agregar
                    </button>
            </form>
        </div>
    )
}

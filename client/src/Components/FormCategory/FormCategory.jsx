import React, {useState} from 'react';
import styles from './formCategory.module.css';
import Swal from 'sweetalert2'
import axios from 'axios';
import {useFormik} from 'formik'
import { connect } from 'react-redux';
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

const FormCategory = (props)=>{

    //Levanto los datos del local para poder enviar con la variante config todos los datos del token
    //con la variante config, por eso la paso como parametro en config (el header)
    let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'token': userLocalstorage !== null ? userLocalstorage.token : null
    },
  };
    
    const formik = useFormik({
        initialValues: {
          name: '',
          description: '',
        },
        validate,
        onSubmit: values => {
            axios.post(`${REACT_APP_BACKEND_URL}/products/category`, values, config)//variable del .env
        .then(resp=>{
            Swal.fire({
                title: `Se agrego categoria: ${values.name}`,
                icon: 'success'
            })
        })
        window.location = "/productslist"
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


const mapStateToProps = state => {
    return {
      userLogin: state.userLogin,
    };
  };
  
  export default connect(mapStateToProps)(FormCategory);
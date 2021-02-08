import axios from 'axios'
import React, {useState} from 'react'
import { connect } from 'react-redux'
import styles from './shippingdetail.module.css'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import {useFormik} from 'formik'

const {REACT_APP_BACKEND_URL} = process.env;

//validacion para formik
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

const ShippingDetail = ({product, imgs, userId}) =>{
//Levanto los datos del local para poder enviar con la variante config todos los datos del token
    //con la variante config, por eso la paso como parametro en config (el header)
    let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'token': userLocalstorage !== null ? userLocalstorage.token : null
    },
  };

const userLogin = useSelector(state => state.userLogin)
  var logged =  userLogin.userLogin

  console.log(logged)

  const formik = useFormik({
    initialValues: {
      name: '',
      street: '',
      identification: '',
      adress: '',
      postalcode: '',
      clarification: '',
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

return (


<div>

    <div className='container'>
            <form className={` w-50 py-3 needs-validation mx-auto`} onSubmit={formik.handleSubmit}>
                <h2 className={`text-center`}>SHIPPING DETAIL</h2>
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
                
            </form>
        </div>
</div>
)
}

export default ShippingDetail;
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
      errors.name = 'Nombre requerido';
    } else if (values.name.length < 0) {
        errors.name = 'Al menos debe tener 5 caracteres';
    }

    if (!values.lastname) {
        errors.lastname = 'Apellido requerido';
      }
      if (!values.identifier) {
        errors.identifier = 'Ingrese su identificacion Ejemplo: 99.999.999 => ingresa 99999999';
      }
      if (!values.address) {
        errors.address = 'Ingrese la dirección de entrega';
      }
      if (!values.postalcode) {
        errors.postalcode = 'Ingrese el codigo postal de su dirección de entrega';
      }
      if (!values.clarification) {
        errors.clarification = 'Nombre requerido';
      } else if (values.clarification.length < 2) {
          errors.clarification = 'Al menos debe tener 2 caracteres';
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
      name: logged.firstname,
      lastname: logged.lastname,
      identifier: '',
      address: logged.address,
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
                <label htmlFor='inputName' className='form-label'>Nombre</label>
                <input 
                    id='inputName' 
                    name='name' 
                    className='form-control' 
                    type='text' 
                    placeholder='Ingrese Nombre' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    />
                    {formik.errors.name && formik.touched.name ? <p className="my-2 error">{formik.errors.name}</p> : null}

                <label htmlFor='inputLastName' className='form-label'>Apellido</label>
                <textarea 
                    id='inputLastName' 
                    name='lastname' 
                    className='form-control' 
                    type='text'
                    rows='1'
                    placeholder='Ingrese Apellido' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname}
                    />
                   {formik.errors.lastname && formik.touched.lastname ? <p className="my-2 error">{formik.errors.lastname}</p> : null}

                   <label htmlFor='inputIdentifier' className='form-label'>DNI / CUIT / CUIL</label>
                <textarea 
                    id='inputIdentifier' 
                    name='identifier' 
                    className='form-control' 
                    type='text'
                    rows='1'
                    placeholder="Ingrese su clave de identificación tributaria sin '.' ni '-'"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.identifier}
                    />
                   {formik.errors.identifier && formik.touched.identifier ? <p className="my-2 error">{formik.errors.identifier}</p> : null}
                
                
                   <label htmlFor='inputAddress' className='form-label'>Dirección de envio</label>
                <textarea 
                    id='inputAddress' 
                    name='address' 
                    className='form-control' 
                    type='text'
                    rows='1'
                    placeholder='Ingrese dirección del envio' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    />
                   {formik.errors.address && formik.touched.address ? <p className="my-2 error">{formik.errors.address}</p> : null}
                
                   <label htmlFor='inputPostalCode' className='form-label'>Codigo postal</label>
                <textarea 
                    id='inputPostalCode' 
                    name='postalcode' 
                    className='form-control' 
                    type='text'
                    rows='1'
                    placeholder='Ingrese su codigo postal' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.postalcode}
                    />
                   {formik.errors.postalcode && formik.touched.postalcode ? <p className="my-2 error">{formik.errors.postalcode}</p> : null}
                
                   <label htmlFor='inputExtraDescription' className='form-label'>Aclaraciones sobre el envio</label>
                <textarea 
                    id='inputExtraDescription' 
                    name='extradescription' 
                    className='form-control' 
                    type='text'
                    rows='3'
                    placeholder='Ingrese aclaraciones: Departamento - Intersecciones de calles' 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.clarification}
                    />
                   {formik.errors.clarification && formik.touched.clarification ? <p className="my-2 error">{formik.errors.clarification}</p> : null}
                
            </form>
        </div>
</div>
)
}

export default ShippingDetail;
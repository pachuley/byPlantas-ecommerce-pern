import React from 'react'
import {useFormik} from 'formik'
import {connect} from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'
import StarRatingComponent from 'react-star-rating-component'
import { FaLeaf } from 'react-icons/fa'
const {REACT_APP_BACKEND_URL} = process.env;

const validate = values => {
    const errors = {};
    if (!values.title) {
      errors.title = 'Titulo requerido';
    } else if (values.title.length < 5) {
      errors.title = 'Al menos debe tener 5 caracteres';
    }
  
    if (!values.comment) {
      errors.comment = 'Comentario requerido';
    }
  
    if (!values.stars) {
      errors.stars = 'Calificación requerida';
    }

    return errors;
  };

const FormReview = ({idProd, ...props}) => {
  let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'token': userLocalstorage !== null ? userLocalstorage.token : null
    },
  };
    const formik = useFormik({
        initialValues: {
          title: '',
          comment: '',
          stars: '5',
          hojitas: 5,
        },
        validate,
        onSubmit: (values)=>{
          let body = {
            ...values,
          }
          console.log(body)
          axios.post(`${REACT_APP_BACKEND_URL}/products/${idProd}/review`, body, config)
            .then(res => {
              Swal.fire({
                title: 'Reseña agregada correctamente',
              })
            })
            window.location= `/products/${idProd}`
        }
    })

    return (
        <div className='container'>
            <form className="mx-auto w-50 py-3" onSubmit={formik.handleSubmit}>
                <h2 className={`text-center`}>Agregar Un Review</h2>
                <div>
                    <label>Titulo</label>
                    <input 
                        type="text"
                        name="title"
                        className="form-control mb-2"
                        placeholder="Ingrese Titulo"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    {formik.errors.title ? <p className="my-2 error">{formik.errors.title}</p> : null}
                    <label>Calificación</label>
                    <select
                        name="stars"
                        className="form-control mb-2"
                        onChange={formik.handleChange}
                        value={formik.values.stars}
                    >
                        <option disabled>-Seleccione una Calificación-</option>
                        <option value='5'>5</option>
                        <option value='4'>4</option>
                        <option value='3'>3</option>
                        <option value='2'>2</option>
                        <option value='1'>1</option>
                    </select>
                    {formik.errors.stars ? <p className="my-2 error">{formik.errors.stars}</p> : null}

                    <label>Hojitas</label>
                    <br/>
                    <StarRatingComponent 
                      name='hojitas'
                      editing={true}
                      renderStarIcon={() => <span><FaLeaf size={30}/></span>}
                      starCount={5}
                      value={formik.values.hojitas}
                      onStarClick={(value,i,name)=>console.log(value,i,name)}
                    />
                    <hr/>

                    <label>Comentario</label>
                    <textarea 
                        type="text"
                        name="comment"
                        className="form-control mb-2"
                        placeholder="Ingrese Comentario"
                        onChange={formik.handleChange}
                        value={formik.values.comment}
                    />
                    {formik.errors.comment ? <p className="my-2 error">{formik.errors.comment}</p> : null}
                </div>
                <button disabled={Object.keys(formik.errors).length > 0} className='btn btnByPlantas mt-2 mb-3' type='submit'>Agregar</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
      userLogin: state.userLogin.userLogin,
  }
  
}
export default connect(mapStateToProps)(FormReview)
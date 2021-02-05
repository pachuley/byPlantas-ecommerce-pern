import React from 'react'
import {useFormik} from 'formik'

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

const FormReview = () => {
    const formik = useFormik({
        initialValues: {
          title: '',
          comment: '',
          stars: '5',
        },
        validate,
        onSubmit: (values)=>{console.log(values)}
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

export default FormReview;
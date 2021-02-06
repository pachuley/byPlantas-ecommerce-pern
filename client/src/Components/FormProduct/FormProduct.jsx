import React,{useEffect, useState}from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import {useFormik} from 'formik'
import { connect } from 'react-redux';
const {REACT_APP_BACKEND_URL} = process.env;


const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Nombre del producto requerido';
  } else if (values.name.length < 5) {
    errors.name = 'Al menos debe tener 5 caracteres';
  }

  if (!values.description) {
    errors.description = 'Descripción requerida';
  }

  if (!values.price) {
    errors.precio = 'Precio requerido';
  } 
  if (!values.stock) {
    errors.precio = 'Stock requerido';
  }
  if (!values.imgProduct) {
    errors.imgProduct = 'Url inválida';
  } else if (values.name.imgProduct < 5) {
    errors.imgProduct = 'Al menos debe tener 5 caracteres';
  }

  return errors;
};


const FormProduct = (props) => {

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
      price: 0,
      stock: 0,
      imgProduct: ''
    },
    validate,
    onSubmit: (values)=>{
      
      axios.post(`${REACT_APP_BACKEND_URL}/products`, values, config)
      .then(res => {
        let prodId = res.data.id;
        axios.post(`${REACT_APP_BACKEND_URL}/products/${prodId}/category/setCategories`,checks, config)
        .then(resp=>{
          Swal.fire({
            title: `Producto agregado: ${values.name}`,
            icon: 'success'
          })
          window.location = "/productslist";
      })
      .catch(e => console.log(e))
    })
    .catch(err => {console.log(err)})
    },
  })

  const [categories, setCategories] = useState([])
  const [checks, setChecks] = useState([])
  
  //este useeffect agarra las categorias y las guarda en el estado categories
  useEffect(()=>{
    axios.get(`${REACT_APP_BACKEND_URL}/products/category`)
    .then(resp=>{setCategories(resp.data)})
    .catch(err=>{console.log(err)})
  }, [])

  //este handleclick agrega los input checkbox que este con la propiedad checked en true al estado checks 
  //y los saca cuando la propiedad checked esta en false
  const handleClick = e => {
    if(e.target.checked){
      setChecks([...checks, parseInt(e.target.id)])
    }else{
      const newChecks = checks.filter(x=>x!==parseInt(e.target.id))
      setChecks(newChecks)
    }
  }

  
  return (
   
      <div className='container'>
        <form className="mx-auto w-50 py-3" onSubmit={formik.handleSubmit}>
            <h2 className={`text-center`}>Agregar Un Producto</h2>
            <div>
                <label>Nombre</label>
                <input 
                  type="text"
                  name="name"
                  className="form-control mb-2"
                  placeholder="Ingrese Producto"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.errors.name ? <p className="my-2 error">{formik.errors.name}</p> : null}
                <label>Descripción</label>
                <input 
                  type="text"
                  name="description"
                  className="form-control mb-2"
                  placeholder="Ingrese Descripción"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
                {formik.errors.description ? <p className="my-2 error">{formik.errors.description}</p> : null}
              <label>Precio</label>
                <input
                  type="number"
                  name="price"
                  className="form-control mb-2"
                  placeholder="Ingrese precio"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
                {formik.errors.price ? <p className="my-2 error">{formik.errors.price}</p> : null}
              <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  placeholder="Ingrese Stock"
                  className="form-control mb-2"
                  onChange={formik.handleChange}
                  value={formik.values.stock}
                />
                {formik.errors.stock ? <p className="my-2 error">{formik.errors.stock}</p> : null}
                <label>Url imagen</label>
                <input
                  type="text"
                  name="imgProduct"
                  placeholder="Url"
                  className="form-control mb-2"
                  onChange={formik.handleChange}
                  value={formik.values.imgProduct}
                />
                {formik.errors.imgProduct ? <p className="my-2 error">{formik.errors.imgProduct}</p> : null}
            </div>
          <div>
            <label>Categorias</label>
              {categories.map((x,index)=>{
                return(
                  <div key={index}>
                    <input type='checkbox' className='form-check-input' id={x.id} name={x.name} onClick={handleClick}/>
                    <label className='form-check-label' htmlFor={x.id}>{x.name}</label>
                  </div>
                )
              })}
          </div> 
          <button disabled={Object.keys(formik.errors).length > 0} className='btn btnByPlantas mt-2 mb-3' type='submit'>Agregar</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userLogin: state.userLogin,
  };
};

export default connect(mapStateToProps)(FormProduct);

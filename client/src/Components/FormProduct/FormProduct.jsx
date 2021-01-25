import React,{useEffect, useState}from 'react';
import axios from 'axios';
const {REACT_APP_BACKEND_URL} = process.env;


const FormProduct = (props) => {
  const [producto, setProducto] = useState({
      nameProduct:"",
      descriptionProduct:"",
      priceProduct:"",
      stockProduct :""
  })
  const [categories, setCategories] = useState([])
  const [checks, setChecks] = useState([])
  
  //este useeffect agarra las categorias y las guarda en el estado categories
  useEffect(()=>{
    axios.get(`${REACT_APP_BACKEND_URL}/products/category`)
    .then(resp=>{setCategories(resp.data)})
    .catch(err=>{console.log(err)})
  }, [])

  //este handleinput cambia el valor del estado producto a medida que se escribe en los input del front
  const handleInputChange = (e) =>{
    setProducto({...producto,
      [e.target.name] : e.target.value })
  }
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

  //este es el handleSubmit que al usar el boton submit hace un post y agrega el producto a la base de datos,
  // y si hay inputs checkbox con la propiedad checked en true, hace un post por cada check en el estado checks para agregar las categorias al producto
  const handleSubmit = (e) =>{
    e.preventDefault()
    var prodId;
    axios.post(`${REACT_APP_BACKEND_URL}/products`, producto)
    .then(res => {
      prodId = res.data.id;
      axios.post(`${REACT_APP_BACKEND_URL}/products/${prodId}/category/setCategories`,checks)
      .then(resp=>{console.log(resp)})
    })
    .catch(err => {console.log(err)})
  }

  // const prueba = e => {
  //   e.preventDefault()
  //   axios.post(`${REACT_APP_BACKEND_URL}/products/17/category/setCategories`, checks)
  //   .then(resp=>{console.log(resp)})
  // }

  return (
   
    <form onSubmit={handleSubmit}>
      <div className='container'>
        <h2>Agregar Un Producto</h2>
        <div>
          <label>Nombre</label>
            <input 
              type="text"
              name="nameProduct"
              className="form-control mb-2"
              placeholder="Ingrese Producto"
              onChange={handleInputChange}
              value={producto.nameProduct}
            />
          <label>Descripción</label>
            <input 
              type="text"
              name="descriptionProduct"
              className="form-control mb-2"
              placeholder="Ingrese Descripción"
              onChange={handleInputChange}
              value={producto.descriptionProduct}
            />
          <label>Precio</label>
            <input
              type="number"
              name="priceProduct"
              className="form-control mb-2"
              placeholder="Ingrese precio"
              onChange={handleInputChange}
              value={producto.priceProduct}
            />
          <label>Stock</label>
            <input
              type="number"
              name="stockProduct"
              placeholder="Ingrese Stock"
              className="form-control mb-2"
              onChange={handleInputChange}
              value={producto.stockProduct}
            />
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
      <button className="btn btn-primary btn-block" type="submit">Agregar</button>
    </div>
  </form>
  )
}


export default FormProduct

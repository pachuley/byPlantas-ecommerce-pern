import React,{useState}from 'react';
import axios from 'axios';
const {REACT_APP_BACKEND_URL} = process.env;


const Formulario = (props) => {
  
  const [producto, setProducto] = useState({
      nameProduct:props ? props.nameProduct : "",
      descriptionProduct:props ? props.descriptionProduct : "",
      priceProduct: props ? props.priceProduct :"",
      stockProduct : props ? props.stockProduct : ""
  })
  
    const handleInputChange = (e) =>{
        //console.log(producto)
       setProducto({...producto,
        [e.target.name] : e.target.value })
    }

   const agregarProducto = (e) =>{
     console.log(producto)
       e.preventDefault()
        console.log(process.env)

           axios.post(`${REACT_APP_BACKEND_URL}/products`, producto)
           
           .then(res => {
             console.log(res)
           })
           .catch(err => {
             console.log(err)
           })
         }


  return (
   
      <form onSubmit={agregarProducto}>
    <div>
      <label>name</label>
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
     type="text"
     name="priceProduct"
     className="form-control mb-2"
     placeholder="Ingrese precio"
     onChange={handleInputChange}
     value={producto.priceProduct}
     />
      <label>Stock</label>
     <input
     type="text"
     name="stockProduct"
     placeholder=" Ingrese Stock"
     className="form-control mb-2"
     onChange={handleInputChange}
     value={producto.stockProduct}
     />
     </div>
     <button className="btn btn-primary btn-block" type="submit">Agregar</button>
      </form>
  )
}


export default Formulario
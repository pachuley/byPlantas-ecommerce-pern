import axios from 'axios';

import React, {Fragment, useState, useEffect} from 'react'
const {REACT_APP_BACKEND_URL} = process.env;


const EditProduct = (props) => { 

 const [producto, setProducto] = useState(props);

 const [products, setProducts] = useState([]);
  
  
   useEffect(()=>{
    axios.get(`${REACT_APP_BACKEND_URL}/products`, producto)
            .then(res => {
              console.log(res)
              setProducts(res.data)
              //console.log(products)
            })
            .catch(err => {
                console.log(err)
            })
            },[])
  
  const handleEdition = (props) =>{
       console.log(props)
       axios.put(`${REACT_APP_BACKEND_URL}/products/${props.id}`, props)
          .then(res =>{
            console.log('me estas editando')
           setProducto(products.map((p => p.props === props)

           ))}
          )}
            
  
 return ( 
   <Fragment>
   
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleEdition(props)}>
  Editar
</button>

   <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Editar producto</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
          <input type="text" name="nameProduct" placeholder="Ingrese Producto"/>
          <input type="text" name="descriptionProduct" placeholder="Ingrese Producto"/>
          <input type="text" name="priceProduct" placeholder="Ingrese Descripción"/>
          <input type="text" name="stockProduct" placeholder="Ingrese Stock"/>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  </Fragment>
  )
}


export default EditProduct;

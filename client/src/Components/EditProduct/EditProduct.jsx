import axios from 'axios';

import React, {Fragment, useState, useEffect} from 'react'
const {REACT_APP_BACKEND_URL} = process.env;


const EditProduct = ({product}) => { 

  const [prod, setProduct ] = useState(product)
  const handleInpedit = (e) => {
    console.log(e.target.value)
    setProduct({
      ...prod,
      [e.target.name]:e.target.value
    })
  } 

  const handleButtonEdit = (e) => {
    let body = {...prod}
    axios.put(`${REACT_APP_BACKEND_URL}/products/${prod.id}`,body)
    .then(res => {
      console.log(res)
      window.location = '/productslist'
    })
  }
            
  
 return ( 
   <Fragment>
     
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${product.id}`}>
        Edit
      </button>

      
      <div className="modal" id={`id${product.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Editar Producto</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>

            <div className="modal-body">
              <label>Nombre</label>
              <input 
                type="text" 
                className="form-control my-2" 
                placeholder="Nombre" 
                onChange={(e) => handleInpedit(e)}
                value={prod.nameProduct}
                name='nameProduct'
                />
              <label>Descripción</label>
              <input 
                type="text" 
                className="form-control my-2" 
                placeholder="Descripción"  
                value={prod.descriptionProduct}
                name='descriptionProduct'
                onChange={(e) => handleInpedit(e)}
                />
              <label>Precio</label>
              <input 
                type="number
                " className="form-control my-2" 
                placeholder="Precio"  
                value={prod.priceProduct}
                name='priceProduct'
                onChange={(e) => handleInpedit(e)}
                />
              <label>Stock</label>
              <input 
                type="number" 
                className="form-control my-2" 
                placeholder="Stock"  
                value={prod.stockProduct}
                name='stockProduct'
                onChange={(e) => handleInpedit(e)}
                />
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-warning" 
                data-dismiss="modal"
                onClick={(e)=>{handleButtonEdit(e)}}
                >
                Editar
              </button>

              <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
            </div>

          </div>
        </div>
      </div>

  </Fragment>
  )
}


export default EditProduct;

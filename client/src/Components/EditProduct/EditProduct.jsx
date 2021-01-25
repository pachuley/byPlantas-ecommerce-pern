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
      window.location = '/prodlist'
    })
  }
/*    useEffect(()=>{
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
          )} */
            
  
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
              <input 
                type="text" 
                className="form-control my-2" 
                placeholder="Nombre" 
                onChange={(e) => handleInpedit(e)}
                value={prod.nameProduct}
                name='nameProduct'
                />
              <input 
                type="text" 
                className="form-control my-2" 
                placeholder="Descripción"  
                value={prod.descriptionProduct}
                name='descriptionProduct'
                onChange={(e) => handleInpedit(e)}
                />
              <input 
                type="number
                " className="form-control my-2" 
                placeholder="Precio"  
                value={prod.priceProduct}
                name='priceProduct'
                onChange={(e) => handleInpedit(e)}
                />
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
                Edit
              </button>

              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </div>
   
{/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleEdition(props)}>
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
          <input type="text" name="descriptionProduct" placeholder="Ingrese Descripción"/>
          <input type="text" name="priceProduct" placeholder="Ingrese Precio"/>
          <input type="text" name="stockProduct" placeholder="Ingrese Stock"/>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}

  </Fragment>
  )
}


export default EditProduct;

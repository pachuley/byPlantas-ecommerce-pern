import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EditProduct from '../EditProduct/EditProduct';
import {Link} from 'react-router-dom'
const {REACT_APP_BACKEND_URL} = process.env;


const ProductsList = (props) => {
  
  const [products, setProducts] = useState([]);

   useEffect(()=>{
    getProducts()
   },[])

    const getProducts = () => {
      axios.get(`${REACT_APP_BACKEND_URL}/products`)
            .then(res => {
              setProducts(res.data)
      })
    }

      const handleDelete = id => {
        axios.delete(`${REACT_APP_BACKEND_URL}/products/${id}`)
          .then(res =>{
                alert('se elimino')
                setProducts(products.filter(p => p.id !== id))
          })
      }

  
    return (
        <div className="container">
          <div className="d-flex justify-content-end pb-2">
            <Link to='/addProduct' className="btn btnByPlantas mr-2">Agregar Producto</Link>
            <Link to='/addCategory' className="btn btnByPlantas">Agregar Categoría</Link>
          </div>
            <table className="table table-striped table-bordered table-hover table-condensed">
                <thead>
                 <tr className="btn-outline-primary">
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                 </tr>
                </thead>
                     <tbody>
                       {
                       products.map((p)=>{
                        return(
                                <tr>
                                  <td>{p.name}</td>
                                  <td>{p.description}</td>
                                  <td>{p.price}</td>
                                  <td>{p.stock}</td>
                                  <td>
                                    <EditProduct product={p}/>
                                  </td>
                  
                                  <td><button type="button" className="btn btn-danger" onClick={()=>handleDelete(p.id)}>Eliminar</button></td>
                                </tr>
                              )
                            })
                          }
                      
                    </tbody>
                      </table>
                    

      
      
     </div>
       
       
                            
                
            
    )}        


export default ProductsList;

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EditProduct from '../EditProduct/EditProduct';
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
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
        Swal.fire({
          title: 'Esta seguro de eliminar el producto?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${REACT_APP_BACKEND_URL}/products/${id}`)
            .then(res =>{
                setProducts(products.filter(p => p.id !== id))
            })
            Swal.fire({
              title:'Eliminado!',
              icon:'success'
            })
          }
        })


        
      }

    

  
    return (
        <div className="container">
          <div className="d-flex justify-content-end pb-2">
            <Link to='/addProduct' className="btn btn-sm btn-success mr-2">Agregar Producto</Link>
            <Link to='/addCategory' className="btn btn-sm btn-success">Agregar Categoría</Link>
          </div>
            <table className="table table-striped table-bordered table-hover table-condensed">
                <thead>
                 <tr className="btn-outline-primary">
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Categorias</th>
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
                                  <div>
              {p.categories.map((x,index)=>{
                return(
                  <div key={index}>
                    <label className='form-check-label' htmlFor={x.id}>{x.name}</label>
                  </div>
                )
              })}
          </div> 
                                  
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

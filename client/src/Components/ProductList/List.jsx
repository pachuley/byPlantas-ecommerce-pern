import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EditProduct from '../EditProduct/EditProduct';
const {REACT_APP_BACKEND_URL} = process.env;


const List = (props) => {
  
  const [producto, setProducto] = useState({
      nameProduct:props ? props.nameProduct : "",
      descriptionProduct:props ? props.descriptionProduct : "",
      priceProduct: props ? props.priceProduct :"",
      stockProduct : props ? props.stockProduct : ""
  });
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

      const handleDelete = id => {
        console.log(id)
        axios.delete(`${REACT_APP_BACKEND_URL}/products/${id}`)
          .then(res =>{
      alert('se elimino')
            setProducts(products.filter(p => p.id !== id))
          })
      }

  
    return (
        <div className="container">
           
            <br></br>
            
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
                       <td>{p.nameProduct}</td>
                       <td>{p.descriptionProduct}</td>
                       <td>{p.priceProduct}</td>
                       <td>{p.stockProduct}</td>
                       <td><EditProduct producto={p}/></td>
      
                       <td><button type="button" className="btn btn-danger" onClick={()=>handleDelete(p.id)}>Eliminar</button></td>
                       </tr>
                             )
                           })
                         }
                      
                    </tbody>
                      </table>
                    

      
      
     </div>
       
       
                            
                
            
    )}        


export default List;

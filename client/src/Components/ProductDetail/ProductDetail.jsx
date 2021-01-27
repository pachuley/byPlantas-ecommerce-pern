import React, { useEffect, useState } from 'react';
import style from './productDetail.module.css'
import axios from 'axios'

const {REACT_APP_BACKEND_URL} = process.env;

const ProductDetail = ({match}) =>{
        const [product, setProduct] = useState({})
        useEffect(()=>{
            getProduct()
        }, [])
        const getProduct = () => {
            axios.get(`${REACT_APP_BACKEND_URL}/products/${match.params.id}`)
            .then(res => {
                setProduct(res.data[0])
            })
        }
        console.log(product)
    return(
        <div className={`mt-5 px-5`}>
           <div className="row py-5">
               <div className="col-4">
                <img src={`${product.imgs ? product.imgs : 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png'}`} alt="" className="img-fluid"/>
               </div>
               <div className="col-8">
                    <h3 className='h3'>{product.name}</h3>
                    <hr/>
                    <p>{product.description}</p>
                    <hr/>
                    <button className="btn btn-outline-success" onClick={()=> alert("New feature available soon")}>Agregar al Carrito</button>
               </div>
           </div>
        </div>
    )
}


export default ProductDetail;

import React, { useEffect, useState } from 'react';
import style from './productDetail.module.css'
import axios from 'axios'
import BtnCart from '../Commons/BtnCart';

const {REACT_APP_BACKEND_URL} = process.env;

const ProductDetail = ({match}) =>{
    const [prod, setProd] = useState({})
    
    useEffect(()=>{
        axios.get(`${REACT_APP_BACKEND_URL}/products/${match.params.id}`)
        .then(res => {
            setProd(res.data)
        })
        // getProduct()
    },[])
    // const getProduct = () => {
    //     axios.get(`${REACT_APP_BACKEND_URL}/products/${match.params.id}`)
    //     .then(res => {
    //         setProduct(res.data[0])
    //         console.log(res.data[0])
    //     })
    // }
    

    
    var id = prod.id
    var stock = prod.stock
    var name = prod.name
    var price = prod.price
    var imgs = prod.imgs
    
    
    return(
        <div className={`mt-5 px-5`}>
           <div className="row py-5">
               <div className="col-4">
                <img src={`${prod.imgs ? prod.imgs : 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png'}`} alt="" className="img-fluid"/>
               </div>
               <div className="col-8">
                    <h3 className='h3'>{prod.name}</h3>
                    <hr/>
                    <p>{prod.description}</p>
                    
                    <hr/>
                    <p>ARS$ {prod.price}</p>
                    <hr/>
                    <p> Stock: {stock}</p>
                    <hr/>
                    <BtnCart className="btn btnByPlantas" productId={id} stock={stock} name={name} price={price} imgs={imgs} />
                    {/* <div>
                        {<BtnCart productId={parseInt(match.params.id)} stock={prod.stock} name={prod.name} price={prod.price} imgs={prod.imgs} />}
                    </div>                     */}
                    
               </div>
           </div>
        </div>
    )
}


export default ProductDetail;

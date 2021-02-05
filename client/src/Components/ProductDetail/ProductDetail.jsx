import React, { useEffect, useState } from 'react';
import style from './productDetail.module.css'
import axios from 'axios'
import BtnCart from '../Commons/BtnCart';
import ReviewContainer from '../ReviewContainer/ReviewContainer'

const {REACT_APP_BACKEND_URL} = process.env;

const ProductDetail = ({match}) =>{
    const [prod, setProd] = useState({})
    const [review, setReviews] = useState([])
    
    useEffect(()=>{
        axios.get(`${REACT_APP_BACKEND_URL}/products/${match.params.id}`)
        .then(res => {
            setProd(res.data)
        })
        getReviews()
    },[])

    const getReviews = () => {
        axios.get(`${REACT_APP_BACKEND_URL}/products/${match.params.id}/review`)
        .then(res => {
            setReviews(res.data.result)
            console.log(res.data)
        })
    }

    let {stock, name, price, imgs, description} = prod
    return(
        <div className={`mt-5 px-5`}>
           <div className="row py-5">
               <div className="col-4">
                <img src={`${imgs ? imgs : 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png'}`} alt="" className="img-fluid"/>
               </div>
               <div className="col-8">
                    <h3 className='h3'>{name}</h3>
                    <hr/>
                    <p>{description}</p>
                    
                    <hr/>
                    <p>ARS$ {price}</p>
                    <hr/>
                    <p> Stock: {stock}</p>
                    <hr/>
                    <BtnCart className="btn btnByPlantas" productId={match.params.id} stock={stock} name={name} price={price} imgs={imgs} />
                    
               </div>
           </div>
           <div className="row">
               <ReviewContainer reviews={review}/>
           </div>
        </div>
    )
}


export default ProductDetail; 
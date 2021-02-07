import React, { useEffect, useState } from 'react';
/* import style from './productDetail.module.css' */
import axios from 'axios'
import BtnCart from '../Commons/BtnCart';
import ReviewContainer from '../ReviewContainer/ReviewContainer'
import Spinner from '../Spinner/Spinner'
import {connect} from 'react-redux'
import {fetchReviews} from '../../Redux/actions/reviewActions'

const {REACT_APP_BACKEND_URL} = process.env;

const ProductDetail = ({match, ...props}) =>{
    const [prod, setProd] = useState({})
    
    useEffect(()=>{
        axios.get(`${REACT_APP_BACKEND_URL}/products/${match.params.id}`)
        .then(res => {
            setProd(res.data)
        })
        props.dispatch(fetchReviews(match.params.id))
    },[])

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
                    <BtnCart className="btn btnByPlantas" productId={parseInt(match.params.id)} stock={stock} name={name} price={price} imgs={imgs} />
                    
               </div>
           </div>
           <div className="row">
               {props.isFetching ? <Spinner /> :
                   <ReviewContainer 
                        reviews={props.reviews}
                        match={match}
                    />

               }
           </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        reviews: state.reviews.reviews,
        isFetching: state.reviews.isFetching
    }
    
}
export default connect(mapStateToProps)(ProductDetail)
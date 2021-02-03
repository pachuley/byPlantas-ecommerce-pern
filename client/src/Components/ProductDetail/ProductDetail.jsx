import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// deberría crear e importar las acciones del create reveiw...ditails product?
import style from './productDetail.module.css'
import axios from 'axios'
import BtnCart from '../Commons/BtnCart';
import Review from '../Review/Rating';
import { useSelector } from 'react-redux';
import User from '../../../../api/src/models/User';

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
            
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        loading: loadingReviewCreate,
        error: errorReviewCreate,
        success: successReviewCreate
    } = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    useEffect(() => {
        if (successReviewCreate) {
            window.alert('Tu Opinión Fue Cargada Satisfactoriamente');
            setRating('');
            dispatchEvent({ type: PRODUCT_CREATE_REVEW});// hay que ver el productconstant
        }
        dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate ]); // verificar el successreviewcreate
    const submitHandler = (e) => {
        e.preventDefault();
        if(comment && rating) {
            dispatch( createReview(productId, {rating, comment }))
        }
    }
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
                    <Review
                        rating= {produtx}
                    ></Review>
                    <p>{prod.description}</p>
                    
                    <hr/>
                    <p>ARS$ {prod.price}</p>
                    <hr/>
                    <p> Stock: {stock}</p>
                    <hr/>
                    <BtnCart className="btn btnByPlantas" productId={match.params.id} stock={stock} name={name} price={price} imgs={imgs} />
                    {/* <div>
                        {<BtnCart productId={parseInt(match.params.id)} stock={prod.stock} name={prod.name} price={prod.price} imgs={prod.imgs} />}
                    </div>                     */}
                    
               </div>
               <div>
                    <label htmlFor="comment">Agregá tu comentario</label>
                    <textarea 
                        id="comment" 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} 
                    ></textarea>
               </div>
               <div>
                   <label/>
                   <button
                        className="primary"
                        type="submit"
                   >Enviar</button>
               </div>
           </div>
        </div>
    )
}


export default ProductDetail;

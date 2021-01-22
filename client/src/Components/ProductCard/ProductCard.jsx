import React from 'react';
import style from './productCard.module.css'
import { Link } from 'react-router-dom';

const ProductCard = (props) =>{

const { nameProduct, descriptionProduct, priceProduct, urlProduct, stockProduct, _id} = props;

    return(
  
        <div className={`${style.boxes}`}>
            <Link to={`/products/:${_id}`}>
            <img className={`${style.img}`} src={urlProduct}/>
            <ul>{nameProduct}</ul>
            
            <ul>ARS {priceProduct}</ul>
            <ul>{stockProduct}</ul>
            </Link>
        </div>
        


    )
}


export default ProductCard;
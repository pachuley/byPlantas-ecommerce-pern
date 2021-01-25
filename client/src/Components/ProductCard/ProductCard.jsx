import React from 'react';
import style from './productCard.module.css'
import { Link } from 'react-router-dom';

const ProductCard = ({ 
    nameProduct, 
    descriptionProduct, 
    priceProduct, 
    urlProduct, 
    stockProduct, 
    id
}) =>{
        return(
            <div className={`${style.boxes}`}>
                <Link to={`/products/${id}`}>
                <img className={`${style.img}`} src={urlProduct}/>
                <ul>{nameProduct}</ul>
                
                <ul>ARS {priceProduct}</ul>
                <ul>{stockProduct}</ul>
                </Link>
            </div>
        )
}
export default ProductCard;
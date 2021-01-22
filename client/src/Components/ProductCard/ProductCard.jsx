import React from 'react';
import style from './productCard.module.css'

const ProductCard = (props) =>{

const { nameProduct, descriptionProduct, priceProduct, urlProduct, stockProduct} = props;

    return(

        <div className={`${style.boxes}`}>
            <img className={`${style.img}`} src={urlProduct}/>
            <ul>{nameProduct}</ul>
            <ul>{descriptionProduct}</ul>
            <ul>ARS {priceProduct}</ul>
            <ul>{stockProduct}</ul>

        </div>
        


    )
}


export default ProductCard;
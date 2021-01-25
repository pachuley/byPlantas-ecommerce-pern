import React from 'react';
import style from './productDetail.module.css'

const ProductDetail = ({ 
      match
    }) =>{
        console.log(match)
    return(
//  <Link/>
        <div className={`${style.boxes}`}>
           {/*  <img className={`${style.img}`} src={urlProduct}/>
            <ul>{nameProduct}</ul>
            <ul>{descriptionProduct}</ul>
            <ul>ARS {priceProduct}</ul>
            <ul>{stockProduct}</ul>
            <button onClick={()=>alert("Not so fast!")}>Add to Cart</button> */}
        </div>
        
//  <Link/>

    )
}


export default ProductDetail;
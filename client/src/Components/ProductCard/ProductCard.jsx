import React from 'react';
import style from './productCard.module.css'
import { Link } from 'react-router-dom';

const ProductCard = (props) =>{

const { nameProduct, descriptionProduct, priceProduct, urlProduct, stockProducts, id} = props;
    console.log(props)
    let newSource = ""
    urlProduct ? newSource=urlProduct : newSource="https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png";
    return(
  
        <div className="card">
  <img  src={newSource} className="img-thumbnail" />
  <div className="card-body">
    <h5 className="card-title">{nameProduct}</h5>
    <p className="card-text"> Stock: {stockProducts}</p>
    <Link to={`/products/${id}`}>
    <a className="btn btn-primary">Product Details</a>
    </Link>
  </div>
</div>
        
        // <div className={`${style.boxes}`}>
        //     <Link to={`/products/${id}`}>
        //     <img className={`${style.img}`} src={urlProduct}/>
        //     <ul>{nameProduct}</ul>
            
        //     <ul>ARS {priceProduct}</ul>
        //     <ul>{stockProduct}</ul>
        //     </Link>
        // </div>
        


    )
}


export default ProductCard;
import React from 'react';
import styles from './productCard.module.css'
import { NavLink } from 'react-router-dom';

const ProductCard = ({ 
    nameProduct, 
    descriptionProduct, 
    priceProduct, 
    urlProduct, 
    stockProducts, 
    id
}) =>{
        return(

            <div className="card">
  <img  src={urlProduct ? urlProduct : "https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png"} className="img-thumbnail" />
  <div className="card-body">
    <h5 className="card-title">{nameProduct}</h5>
    <p className="card-text"> Stock: {stockProducts}</p>
    <NavLink to={`/products/${id}`}>
    <a className="btn btn-primary">Product Details</a>
    </NavLink>
  </div>
</div>
            
        )
}
export default ProductCard;
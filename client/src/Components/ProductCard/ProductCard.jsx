import React from 'react';
import styles from './productCard.module.css'
import { NavLink } from 'react-router-dom';

const ProductCard = ({ 
    name, 
    description, 
    price, 
    imgs, 
    stock, 
    id
}) =>{
        return(

            <div className="card">
  <img  src={imgs ? imgs : "https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png"} className="img-thumbnail" />
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    <p className="card-text"> Stock: {stock}</p>
    <NavLink to={`/products/${id}`}>
    <a className="btn btnByPlantas">Product Details</a>
    </NavLink>
  </div>
</div>
            
        )
}
export default ProductCard;
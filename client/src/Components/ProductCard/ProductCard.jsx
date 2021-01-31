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

            <div className="card mt-3">
              <img  src={imgs ? imgs : "https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png"} className="img-thumbnail" />
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text"> Stock: {stock}</p>
                <p className="card-text"> Precio: {price}</p>
                <NavLink to={`/products/${id}`}>
                  <button className="btn btn-primary">Product Details</button >
                </NavLink>
            </div>
</div>
            
        )
}
export default ProductCard;
import React from 'react';
import styles from './productCard.module.css'
import { NavLink } from 'react-router-dom';
import BtnCart from '../Commons/BtnCart';

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
      <NavLink to={`/products/${id}`}>
        <img  src={imgs ? imgs : "https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png"} className="img-thumbnail" />
      </NavLink>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className='card-text'>Precio: ARS$ {price}</p>
        <p className="card-text">Stock: {stock}</p>
        <BtnCart className="btn btnByPlantas" productId={id} stock={stock} name={name} price={price} imgs={imgs} />
      </div>
    </div>
  )
}
export default ProductCard;
import React from 'react';
import styles from './productCard.module.css';
import { NavLink } from 'react-router-dom';
import BtnCart from '../Commons/BtnCart';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const ProductCard = ({ name, description, price, imgs, stock, id }) => {

  const cartItems = useSelector(state => state.cart.cartItems)
  let item = cartItems.find(item => item.productId === id)

  return (
    <div className='card'>
      <div className={`${styles.imgContainer}`}>
        <NavLink to={`/products/${id}`}>
          <img
            src={imgs ? imgs : 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png'}
            className='img-thumbnail'
          />
        </NavLink>
      </div>
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <p className='card-text'>Precio: ARS$ {price}</p>
        <p className='card-text'>Stock: {stock}</p>
        <BtnCart 
          productId={id} 
          quantity={item !== undefined ? item.quantity : 0}
        />
      </div>
    </div>
  );
};
export default ProductCard;

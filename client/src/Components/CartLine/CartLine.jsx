import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnCart from '../Commons/BtnCart';
import { removeFromCart, removeFromCartGuest } from '../../Redux/actions/cartActions';
import {FaTrashAlt,FaPlusSquare} from 'react-icons/fa'
import styles from './cartline.module.css'

const CartLine = ({ product }) => {
  const imgDefault = 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png';
  
  
  const { orderId, productId, productName, productPrice, productDescription, quantity,imgs, stockProduct,total } = product;
  const userLogin = useSelector(state => state.userLogin)
  const cart = useSelector(state => state.cart)
  const isAuth =  userLogin.userLogin
  const dispatch = useDispatch();

  const removeItem = id => {
    let itemCart = cart.cartItems.find(element => element.productId === id)
    let itemCartGuest = cart.cartItemsGuest.find(element => element.productId === id)
    if(itemCart){
      dispatch(removeFromCart(id))
    }
    if(itemCartGuest){
      dispatch(removeFromCartGuest(id))
    }
  };
  return (
    <div className={`${styles.cartlineContainer}`}>
      <div className={`${styles.imgContainer} col-2`}>
        <img src={imgs ? imgs : imgDefault} className={`${styles.img} img-fluid img-thumbnail`} alt='' />
      </div>
      <div className='col-3'>
        <h5 className={`${styles.titleCart}`}>{productName || product.name}</h5>
      </div>
      <div className='col-3'>
        <BtnCart 
            productId={productId} 
            quantity={quantity}
        />
      </div>
      <div className={`${styles.textContainer}`}>
        <span>Precio: ARS {productPrice || product.price}</span>
        <span>Cant: {quantity}</span>
      </div>
      <div>
        <button className={`${styles.btnCierre} col-2`} onClick={() => removeItem(productId)}>
          <FaTrashAlt/>
        </button>
      </div>
    </div>
  );
};

export default CartLine;

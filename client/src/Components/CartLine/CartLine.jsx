import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnCart from '../Commons/BtnCart';
import { removeFromCart } from '../../Redux/actions/cartActions';
import styles from './cartline.module.css'

const CartLine = ({ product }) => {
  const imgDefault = 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png';
  
  
  const { orderId, productId, productName, productPrice, productDescription, quantity,imgs, stockProduct,total } = product;

  const dispatch = useDispatch();
  const removeItem = id => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className={`${styles.cartlineContainer}`}>
      <div className={`${styles.imgContainer} col-2`}>
        <img src={imgs ? imgs : imgDefault} className={`${styles.img} img-fluid img-thumbnail`} alt='' />
      </div>
      <div className='col-3'>
        <h5 className={`${styles.titleCart}`}>{productName}</h5>
      </div>
      <div className='col-3'>
        <BtnCart 
            productId={productId} 
            quantity={quantity}
        />
      </div>
      <div className={`${styles.textContainer}`}>
        <span>Precio: ARS {productPrice}</span>
        <span>Cant: {quantity}</span>
      </div>
      <div>
        <button className={`${styles.btnCierre} col-2`} onClick={() => removeItem(productId)}>
          x
        </button>
      </div>
    </div>
  );
};

export default CartLine;

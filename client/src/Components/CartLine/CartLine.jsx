import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BtnCart from '../Commons/BtnCart';
import { removeFromCart } from '../../Redux/actions/cartActions';

const CartLine = ({ product }) => {
  const imgDefault = 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png';
  
  
  const { orderId, productId, productName, productPrice, productDescription, quantity,imgs, stockProduct,total } = product;

  const dispatch = useDispatch();
  const removeItem = id => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className='row my-2'>
      <div className='col-2'>
        <img src={imgs ? imgs : imgDefault} className='img-fluid' alt='' />
      </div>
      <div className='col-2'>
        <p className='text-uppercase'>{productName}</p>
        <p>{productDescription}</p>
      </div>
      <div className='col-2'>
        <p>Precio: ARS {productPrice}</p>
        <p>Cant: {quantity}</p>
      </div>
      <div className='col-3'>
        <BtnCart 
            productId={productId} 
            quantity={quantity} 
        />
      </div>
      <div className='col-2'>
        <button className='btn btn_sm' onClick={() => removeItem(productId)}>
          X
        </button>
      </div>
    </div>
  );
};

export default CartLine;

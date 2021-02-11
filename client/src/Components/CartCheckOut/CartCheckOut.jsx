import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const CartCheckOut = ({ product }) => {
  const imgDefault = 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png';
  
  
  const { orderId, productId, productName, productPrice, productDescription, quantity,imgs, stockProduct,total } = product;

  const dispatch = useDispatch();
  
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
        <p>Total: {quantity*productPrice}</p>
      </div>
      <div className='col-2'>
      </div>
    </div>
  );
};

export default CartCheckOut;

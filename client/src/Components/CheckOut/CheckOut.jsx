import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import styles from './checkout.module.css'
import CartCheckOut from '../CartCheckOut/CartCheckOut'
import { useSelector } from 'react-redux'
import Payment from '../Payment/Payment'
import ShippingDetail from '../ShippingDetail/ShippingDetail';

const {REACT_APP_BACKEND_URL} = process.env;
const CheckOut = ()=>{

  //Levanto los datos del local para poder enviar con la variante config todos los datos del token
    //con la variante config, por eso la paso como parametro en config (el header)
    let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'token': userLocalstorage !== null ? userLocalstorage.token : null
      },
    };

    //invocamos para saber si estamos loggeados desde redux
  const userLogin = useSelector(state => state.userLogin)
  var logged =  userLogin.userLogin
  const cartItems = useSelector(state => state.cart.cartItems)
  
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)

  return (
    <div className={`${styles.checkoutContainer}`}>
      <div>
        <h2 className={`m-0 text-left p-5`}>¿Estas listo para comprar?</h2>
      </div>
      <div className={`${styles.checkout}`}>
        <div className={`col-8`}>
            {cart ? cartItems.map((product,index)=>(
                <div key={index}>
                    <CartCheckOut product={product} />
                </div>
            )) : <h1>El carrito esta vacio</h1>}                
        </div>
        <div className='text-center container col-3'>
            <Payment/>
        </div>
      </div> 
        <div className='text-center mt-2 container'>
            <ShippingDetail/>
        </div>
    </div>
  )
}

export default CheckOut;
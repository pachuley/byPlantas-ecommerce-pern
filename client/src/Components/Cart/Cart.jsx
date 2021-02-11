import React, { useEffect, useState } from 'react'
import CartLine from '../CartLine/CartLine'
import BtnCheckout from '../Commons/BtnCheckout/BtnCheckout'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {getItems} from '../../Redux/actions/cartActions'

const Cart = () => {

  let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))

  const userLogin = useSelector(state => state.userLogin)
  const cartItems = useSelector(state => state.cart.cartItems)
  const dispatch=useDispatch()
  const isAuth =  userLogin.userLogin
  const totalCart = () => {
      let totalCart = 0
      cartItems.forEach(element => {
        totalCart +=  element.total
      });
      return totalCart
  }
    useEffect(()=>{
      if(isAuth){
        dispatch(getItems())
      }
    },[])
    return (
      <div className="container">
        <div className="row">
          <h5 className={`m-0 py-1`}>Aquí están los productos que elegiste</h5>
        </div>
        <div className="row">
          <div className="col-8">
          {
            cartItems.lenght === 0 ? 
            <div className="alert alert-primary" role="alert">
              El carrito está vacío
            </div>
            : cartItems.map((product, index) => {
              return <CartLine product={product} />
            })
          }
          </div>
          <div className="col-4">
              <div>Precio Total ({cartItems.length}) items</div>
              <p className="mt-1">Total: ${totalCart()}</p>
              {
                isAuth ? 
                <BtnCheckout
                  disabled={cartItems<=0 ? true : false}
                  orderId={cartItems.lenght > 0 ? cartItems[0].orderId : '#'}
                />
                :
                <Link to='/login' className="btn btn-secondary btn-sm">
                  Ir a login
                </Link>
              }
          </div>
        </div>
      </div>
        
    )
}

export default Cart
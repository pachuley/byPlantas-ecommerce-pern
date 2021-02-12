import React, { useEffect, useState } from 'react'
import CartLine from '../CartLine/CartLine'
import BtnCheckout from '../Commons/BtnCheckout/BtnCheckout'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {getItems} from '../../Redux/actions/cartActions'
import {updateOrder} from '../../Redux/actions/orderActions'

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
    const orderid = cartItems[0]?.orderId
    const handleCheckout = () => {
      dispatch(updateOrder(orderid,'processing'))
        console.log(orderid)
    }
    
    return (
      <div className="container">
        <div className="row">
          <h2 className={`m-0 text-center p-5`}>Aquí están los productos que elegiste</h2>
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
                  disabled={orderid === undefined ? true : false}
                  orderId={orderid !== undefined ? cartItems[0].orderId : ''}
                  handleCheckout={handleCheckout}
                />
                :
                <Link to='/login' className="btn btnByPlantas btn-sm">
                  Ingresa a tu cuenta!
                </Link>
              }
          </div>
        </div>
      </div>
        
    )
}

export default Cart
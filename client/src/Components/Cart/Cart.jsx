import React from 'react'
import CartLine from '../CartLine/CartLine'
import BtnCheckout from '../Commons/BtnCheckout/BtnCheckout'
import {useSelector} from 'react-redux'

const Cart = () => {

  let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))

  const userLogin = useSelector(state => state.userLogin)
  const cartItems = useSelector(state => state.cart.cartItems)
  const logged =  userLogin.userLogin

    const totalCart = () => {
      let total = 0
      cartItems.forEach(element => {
        total = total + (parseFloat(element.price) * parseInt(element.quantity))
      });
      return total
    }
    
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
            : cartItems.map((item, index) => {
              return <CartLine product={item} />
            })
          }
          </div>
          <div className="col-4">
              <div>Precio Total ({cartItems.length}) items</div>
              <p className="mt-1">Total: ${totalCart()}</p>
              <BtnCheckout/>
          </div>
        </div>
      </div>
        
    )
}

export default Cart
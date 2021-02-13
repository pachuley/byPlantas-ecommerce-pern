import React, { useEffect, useState } from 'react'
import CartLine from '../CartLine/CartLine'
import BtnCheckout from '../Commons/BtnCheckout/BtnCheckout'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {getItems, removeAllItems} from '../../Redux/actions/cartActions'
import {updateOrder} from '../../Redux/actions/orderActions'
import Swal from 'sweetalert2'
import { useHistory } from "react-router"
import styles from './cart.module.css'

const Cart = () => {

  const userLogin = useSelector(state => state.userLogin)
  const cartItems = useSelector(state => state.cart.cartItems)
  const dispatch=useDispatch()
  const isAuth =  userLogin.userLogin
  let history = useHistory()

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
        dispatch(updateOrder(orderid,'active'))
      }
    },[])
    const orderid = cartItems[0]?.orderId


    const handleCheckout = async() => {
      const result = await Swal.fire({
        title: 'Esta seguro de comenzar con el checkout?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, comenzar!',
        cancelButtonText: 'Cancelar'
      })
      if(result.isConfirmed){
          dispatch(updateOrder(orderid,'processing'))
          history.push(`/checkout/${orderid}`)
      }
    }


    const handleRemoveAll = () => {
      Swal.fire({
        title: 'Esta seguro de eliminar los items?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removeAllItems())
          Swal.fire(
            'Eliminados!',
            'Su carrito fue vaciado',
            'success'
          )
        }
      })
    }
    
    return (
      <div className="container">
        <div className="row py-2">
          <div className="col-6">
            <h5 className={`m-0 py-1`}>Aquí están los productos que elegiste</h5>
          </div>
          <div className="col-6">
            <button 
              className="btn btn-sm btn-danger" 
              onClick={handleRemoveAll}
              disabled={cartItems.length === 0 ? true : false}
              >
                Vaciar
              </button>
          </div>
        </div>
        <div className={`${styles.cart}`}>
          <div className={`${styles.cartlinesContainer} col-9`}>
          {
            cartItems.length === 0 ? 
            <div className="alert alert-primary" role="alert">
              El carrito está vacío
            </div>
            : cartItems.map((product, index) => {
              return <CartLine product={product} />
            })
          }
          </div>
          <div className="col-2">
              <div className={`text-center`}>Precio ({cartItems.length}) items</div>
              <p className="text-center mt-1">Total: ${totalCart()}</p>
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
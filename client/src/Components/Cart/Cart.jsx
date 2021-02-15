import React, { useEffect, useState } from 'react'
import CartLine from '../CartLine/CartLine'
import BtnCheckout from '../Commons/BtnCheckout/BtnCheckout'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {getItems, removeAllItems,removeAllItemsGuest,joinCarts} from '../../Redux/actions/cartActions'
import {updateOrder} from '../../Redux/actions/orderActions'
import {getOrderUser} from '../../Redux/actions/orderActions'
import Swal from 'sweetalert2'
import { useHistory } from "react-router"
import styles from './cart.module.css'
import {FaTrashAlt,FaPlusSquare} from 'react-icons/fa'

const Cart = () => {

  const userLogin = useSelector(state => state.userLogin)
  const cartItems = useSelector(state => state.cart.cartItems)
  const cartItemsGuest = useSelector(state => state.cart.cartItemsGuest)
  const dispatch=useDispatch()
  const isAuth =  userLogin.userLogin
  let history = useHistory()
  console.log(cartItemsGuest.length > 0 )

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
        dispatch(getOrderUser())
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
        title: 'Esta seguro de vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          if(cartItems.length > 0){
            dispatch(removeAllItems())
            Swal.fire(
              'Eliminados!',
              'Su carrito fue vaciado',
              'success'
            )
          }
          if(cartItemsGuest.length > 0){
            dispatch(removeAllItemsGuest())
            Swal.fire(
            'Eliminados!',
            'Su carrito fue vaciado (Guest)',
            'success'
            )
          } 
        }
      })
    }
    const joinCartHandle = () => {
      dispatch(joinCarts())
      Swal.fire(
        'Se agregaron a su orden!',
        )
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
              disabled={cartItems.length === 0 && cartItemsGuest.length === 0 ? true : false}
              >
                Vaciar <FaTrashAlt className="ml-1"/>
              </button>
          </div>
        </div>
        <div className={`${styles.cart}`}>
          <div className={`${styles.cartlinesContainer} col-9`}>
          {
            isAuth !== null && (cartItems.length === 0 && cartItemsGuest.length === 0) ? 
              <div className="alert alert-primary" role="alert">
                El carrito está vacío
              </div>
            : cartItems.map((product, index) => {
              return <CartLine product={product} />
            })
          }
          {
            (cartItemsGuest.length > 0) ? 
            <>
                <div className="alert alert-primary d-flex justify-content-between" role="alert">
                  <span>Productos que agrego como invitado</span>
                  <div>
                  <button 
                    className="btn btn-success btn_sm mx-1"
                    onClick={joinCartHandle}
                    disabled={isAuth === null ? true : false}
                  ><FaPlusSquare/></button>
                  <button 
                    className="btn btn-success btn_sm"
                    onClick={() => {dispatch(removeAllItemsGuest())}}
                    ><FaTrashAlt/></button>
                  </div>
                </div>
                {
                  cartItemsGuest.map((product, index) => {
                  return <CartLine product={product} />
                })
                }
            </>
            : null
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
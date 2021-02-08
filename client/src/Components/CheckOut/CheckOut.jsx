import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
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
  
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)


    // verificar si hay un usuario logueado y si no usar el carrito como guest, corroborarlo en el store
    useEffect(()=>{
      if(!logged){
        if(!localStorage.getItem('Cart')){
          localStorage.setItem('Cart', JSON.stringify({Products:[]}))
        }
        const storage = JSON.parse(localStorage.getItem('Cart'))
        var subtotal = 0;
        storage.Products.forEach(x=>{subtotal = subtotal + parseFloat(x.price * x.quantity)})
        setCart(storage.Products)
        setTotal(subtotal)
      }else{
        buscarProducts()
      } 
    }, [])

    const buscarProducts = () => {
      axios.get(`${REACT_APP_BACKEND_URL}/users/${logged.id}/cart`, config)
        .then(resp=>{
          console.log(resp)
          setCart(resp.data[0].products)
          var subtotal = 0;
          
          resp.data[0].products.forEach(x=>
            x.orderline.total !== undefined || x !== undefined?
            subtotal = subtotal + parseFloat(x.orderline.total)
            :
            subtotal = 0)
          parseFloat(subtotal)
          setTotal(subtotal)
        })
    }
    
console.log(cart)
    return (
        <div>
            
              <h2 className={`m-0 text-left p-5`}>Aquí están los productos que elegiste</h2>

              <div className={'m-0 text-left p-2 l-5'}>
                  {cart[0] ? cart.map((product,index)=>(
                      <div key={index}>
                          <CartCheckOut product={product} />
                      </div>
                  )) : <h1>El carrito esta vacio</h1>}                
              </div>
             
              <div className='text-center mt-5 container'>
                  <Payment/>
              </div>
              <div className='text-center mt-5 container'>
                  <ShippingDetail/>
              </div>
            
        </div>
    )
}



export default CheckOut;
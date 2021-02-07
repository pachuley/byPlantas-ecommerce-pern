import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import CartLine from '../CartLine/CartLine'
const {REACT_APP_BACKEND_URL} = process.env;

function Cart (){
    const [logged, setlogged] = useState(JSON.parse(localStorage.getItem('Login')))
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
      axios.get(`${REACT_APP_BACKEND_URL}/users/${logged.userId}/cart`)
        .then(resp=>{
          console.log(resp)
          setCart(resp.data[0].products)
          var subtotal = 0;
          resp.data[0].products.forEach(x=>{subtotal = subtotal + parseFloat(x.price * x.orderline.quantity)})
          setTotal(parseFloat(subtotal))
        })
    }
    

    return (
        <div>
            <div className = {`row containerByPlantas`}>
              <h2 className={`m-0 text-center p-5`}>Aquí están los productos que elegiste</h2>
              <div className='row text-center'>
                  {cart[0] ? cart.map((product,index)=>(
                      <div key={index}>
                          <CartLine product={product} />
                      </div>
                  )) : <h1>El carrito esta vacio</h1>}                
              </div>
              <div className='text-center mt-5 container'>
                  <h4>Precio Total</h4>
                  <hr/>
                  <p>Total: ARS$ {total}</p>
              </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({}) 


export default connect(mapStateToProps, mapDispatchToProps) (Cart)
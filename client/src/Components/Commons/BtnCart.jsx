import React, { useEffect, useState } from 'react'
import style from './BtnCart.module.css'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'
const {REACT_APP_BACKEND_URL} = process.env;

export default function BtnCart ({productId, stock, name, price, imgs}){

//Levanto los datos del local para poder enviar con la variante config todos los datos del token
    //con la variante config, por eso la paso como parametro en config (el header)
    let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'token': userLocalstorage !== null ? userLocalstorage.token : null
      },
    };


    const [logged, setlogged] = useState(JSON.parse(localStorage.getItem('Login')))
    const [order, setOrder] = useState({
        productId: productId,
        userId: logged ? logged.userId : 0,
        quantity: 0,
        discount: 0,
        imgs,
        price,
    })

    //console.log({productId, stock, name, price, imgs})
    const [guestOrder, setGuestOrder] = useState({
        id: productId,
        quantity: 0,
        discount: 0,
        name: name,
        price: price,
        imgs:imgs,
    })

    
    const handleContador = e =>{
        
        if(logged){
            if(e.target.id === 'btnCartPlus'){
                if(order.quantity < stock){setOrder({...order, quantity: order.quantity + 1})}            
            }else{
                if(order.quantity > 0){setOrder({...order, quantity: order.quantity - 1})}
            }
        }else{
            if(e.target.id === 'btnCartPlus'){
                if(guestOrder.quantity < stock){setGuestOrder({...guestOrder, id:productId, name: name, price:price, imgs:imgs, quantity: guestOrder.quantity + 1})}            
            }else{
                if(guestOrder.quantity > 0){setGuestOrder({...guestOrder, id:productId, name: name, price:price, imgs:imgs, quantity: guestOrder.quantity - 1})}
            }
        }
    }

    const handleClick = e => {
        
        logged ? setOrder({...order, imgs: imgs}) : setGuestOrder({...guestOrder})
        logged !== null ? handleAddtocart() : handleAddtoguest() ;
        setOrder({...order, quantity: 0})
        setGuestOrder({...guestOrder, quantity: 0})
    }

    const handleAddtocart = e =>{
        //if(order.price){
            axios.post(`${REACT_APP_BACKEND_URL}/users/${logged.userId}/cart`, order, config)
            .then(resp=>{
            Swal.fire({
                title: `El producto se agrego al carrito`,
                icon: 'info'
              })
        })
    }
//aca esta mal
    const handleAddtoguest = e =>{
        console.log (localStorage.getItem('Cart'))
        if(!localStorage.getItem('Cart')){
            localStorage.setItem('Cart', JSON.stringify({Products:[]}))
        }
        if(guestOrder.quantity > 0){
            let dataStorage = JSON.parse(localStorage.getItem('Cart'))
            dataStorage.Products = dataStorage.Products.filter(x=>x.id !== guestOrder.id)            
            //if(guestOrder.name){
                dataStorage.Products.push(guestOrder)
            //}
            localStorage.setItem('Cart', JSON.stringify(dataStorage))
            Swal.fire({
                title: `El producto se agrego al carrito`,
                icon: 'info'
              })
        }else{
            Swal.fire({
                title: `No puedes Agregar 0 Items de un Productoo`,
                icon: 'error'
              })
        }       
    }

    return (
        <div>
            <div className={style.divContainer}>
                <button type='button' id='btnCartLess' className={`btn btn-danger btn-sm m-2 ${style.btnCart}`} onClick={handleContador}>-</button>
                <p className='m-2'>{logged ? order.quantity : guestOrder.quantity}</p>
                <button type='button' id='btnCartPlus' className={`btn btn-danger btn-sm m-2 ${style.btnCart}`} onClick={handleContador}>+</button>
            </div>
            <div>
                <button type='button' onClick={handleClick} className='btn btnByPlantas mt-2 mb-3'>Agregar Producto</button>
            </div>
        </div>
    )
}
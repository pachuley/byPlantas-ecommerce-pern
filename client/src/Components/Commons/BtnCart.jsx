import React, { useEffect, useState } from 'react'
import style from './BtnCart.module.css'
import {connect} from 'react-redux'
import axios from 'axios'
const {REACT_APP_BACKEND_URL} = process.env;

export default function BtnCart ({productId, stock, name, price, imgs}){
    const [logged, setlogged] = useState(JSON.parse(localStorage.getItem('Login')))
    const [order, setOrder] = useState({
        productId: productId,
        userId: logged ? logged.userId : 0,
        quantity: 0,
        discount: 0,
        imgs,
        price,
    })

    console.log({productId, stock, name, price, imgs})
    const [guestOrder, setGuestOrder] = useState({
        id: productId,
        quantity: 0,
        discount: 0,
        name: name,
        price: price,
        imgs:imgs,
    })

    

    const handleContador = e =>{
        console.log(guestOrder)
        if(logged){
            if(e.target.id === 'btnCartPlus'){
                if(order.quantity < stock){setOrder({...order, quantity: order.quantity + 1})}            
            }else{
                if(order.quantity > 0){setOrder({...order, quantity: order.quantity - 1})}
            }
        }else{
            if(e.target.id === 'btnCartPlus'){
                if(guestOrder.quantity < stock){setGuestOrder({...guestOrder, name: name, price:price, imgs:imgs, quantity: guestOrder.quantity + 1})}            
            }else{
                if(guestOrder.quantity > 0){setGuestOrder({...guestOrder, name: name, price:price, imgs:imgs, quantity: guestOrder.quantity - 1})}
            }
        }
    }

    const handleClick = e => {
        console.log(logged)
        logged ? setOrder({...order, imgs: imgs}) : setGuestOrder({...guestOrder})
        logged !== null ? handleAddtocart() : handleAddtoguest() ;
    }

    const handleAddtocart = e =>{
        //if(order.price){
            axios.post(`${REACT_APP_BACKEND_URL}/users/${logged.userId}/cart`, order)
            .then(resp=>{
            alert('Producto Agregado al Carrito')
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
            alert('Producto Agregado al Carrito')
        }else{
            alert('No puedes Agregar 0 Items de un Producto')
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
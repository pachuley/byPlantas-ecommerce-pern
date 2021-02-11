import React, { useEffect, useState } from 'react'
import style from './BtnCart.module.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useSelector,useDispatch} from 'react-redux'
import {addToCart} from '../../Redux/actions/cartActions'

export default function BtnCart ({productId, quantity}){

const userLogin = useSelector(state => state.userLogin)
const dispatch = useDispatch()

const [qty,setQty] = useState(0)
const addQty = () =>{
    setQty(qty+1)
}
const resQty = () =>{
    if(qty === 0){
        setQty(0)
    }else{
        setQty(qty-1)
    }
}
useEffect(()=>{
    setQty(quantity)
},[])

var logged =  userLogin.userLogin

    const handle = () => {
        if(productId){
            if(qty === 0){
                Swal.fire({
                    title: 'Debes ingresar la cantidad',
                    icon: 'error'
                })
            }else{
                dispatch(addToCart(productId,qty))
                Swal.fire({
                    title: 'Se agrego el producto',
                    icon: 'success'
                })
            }
        }
    }
    

    return (
        <div>
            <div className={style.divContainer}>
                <button 
                    type='button' 
                    id='btnCartLess' 
                    className={`btn btn-danger btn-sm m-2 ${style.btnCart}`} 
                    onClick={resQty}>-</button>
                <p className='m-2'>{qty}</p>
                <button 
                    type='button' 
                    id='btnCartPlus' 
                    className={`btn btn-danger btn-sm m-2 ${style.btnCart}`} 
                    onClick={addQty}>+</button>
            </div>
            <div>
                <button type='button' onClick={handle} className='btn btnByPlantas mt-2 mb-3'>Agregar Producto</button>
            </div>
        </div>
    )
}
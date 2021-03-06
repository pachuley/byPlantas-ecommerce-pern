import React, { useEffect, useState } from 'react'
import style from './BtnCart.module.css'
import Swal from 'sweetalert2'
import { useSelector,useDispatch} from 'react-redux'
import {addToCart,addToCartGuest} from '../../Redux/actions/cartActions'
import {FaPlus} from 'react-icons/fa'

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
                if(logged !== null){
                    dispatch(addToCart(productId,qty))
                    Swal.fire({
                        title: 'Se agrego el producto',
                        icon: 'success'
                    })
                }else{
                    dispatch(addToCartGuest(productId,qty))
                    Swal.fire({
                        title: 'Se agrego el producto (invitado)',
                        icon: 'success'
                    })
                }
            }
        }
    }
    

    return (
        <div className={`${style.btnContainer}`} >
            <div className={style.divContainer}>
                <button 
                    type='button' 
                    id='btnCartLess' 
                    className={`btn btn-sm m-2 ${style.btnCart}`} 
                    onClick={resQty}>-</button>
                <p className='m-2'>{qty}</p>
                <button 
                    type='button' 
                    id='btnCartPlus' 
                    className={`btn btn-sm m-2 ${style.btnCart}`} 
                    onClick={addQty}>+</button>
            </div>
            <div className=''>
                <button type='button' onClick={handle} className='d-flex justify-content-center align-items-center btn btnByPlantas mt-2 mb-3'><FaPlus/> <span>Producto</span></button>
            </div>
        </div>
    )
}
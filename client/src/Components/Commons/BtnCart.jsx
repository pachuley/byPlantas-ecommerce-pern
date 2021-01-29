import React, { useEffect, useState } from 'react'
import style from './BtnCart.module.css'
import {connect} from 'react-redux'

function BtnCart (){
    const [contador, setContador] = useState(0)
    const [user, setUser] =useState('')
    const [order, setOrder] = useState({
        productId:'',
        userId:'',
        quantity: contador,
        price: '',
    })

    useEffect(()=>{
        
    },[])

    const handleContador = e =>{
        if(e.target.id === 'btnCartPlus'){
            setContador(contador + 1)
        }else{
            if(contador > 0){setContador(contador - 1)}
        }
    }

    return (
        <div>
            <div className={style.divContainer}>
                <button type='button' id='btnCartLess' className={`btn btn-danger btn-sm m-2 ${style.btnCart}`} onClick={handleContador}>-</button>
                <p className='m-2'>{contador}</p>
                <button type='button' id='btnCartPlus' className={`btn btn-danger btn-sm m-2 ${style.btnCart}`} onClick={handleContador}>+</button>
            </div>
            <div>
                <button type='button' onClick className='btn btn-primary mt-2 mb-3'>Agregar Producto</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({}) 

export default connect(mapStateToProps, mapDispatchToProps)(BtnCart)
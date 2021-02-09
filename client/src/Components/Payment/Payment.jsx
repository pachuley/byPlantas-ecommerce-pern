import axios from 'axios'
import React, {useState} from 'react'
import { connect } from 'react-redux'
import styles from './payment.module.css'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const {REACT_APP_BACKEND_URL} = process.env;

const Payment = ({cart, imgs, userId}) =>{
console.log(cart)

let totalPayment = 0;

cart.forEach(e=>totalPayment = (e.orderline.price * e.orderline.quantity) + totalPayment )

console.log(totalPayment)
return (


<div className='border'>
    PAYMENT

<p>total: {totalPayment}</p>

    <label for="cars">Elige un metodo de pago:   </label>
  <select name="PaymentMethod" id="PaymentMethod">
    <option value="MercadoPago">MercadoPago</option>
    <option value="Tarjeta">Tarjeta de credito/debito</option>
    <option value="Efectivo">Efectivo</option>
    <option value="Transferencia">Transferencia</option>
  </select>

  <div>
      <button>Finalizar Compra</button>
  </div>

</div>
)
}

export default Payment;
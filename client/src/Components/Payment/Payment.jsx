import axios from 'axios'
import React, {useState} from 'react'
import { connect } from 'react-redux'
import styles from './payment.module.css'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const {REACT_APP_BACKEND_URL} = process.env;

const Payment = ({cart, imgs, userId}) =>{

const [payment, setPayment] = useState('efectivo')

//
let totalPayment = 0;
cart.forEach(e=>totalPayment = (e.orderline.price * e.orderline.quantity) + totalPayment )
//

const handleSelect = (event) => {
  setPayment(event.target.value)
}

console.log(payment)
return (


<div className='border'>
    PAYMENT

<p>total: {totalPayment}</p>


    <label for="PaymentMethod">Elige un metodo de pago:   </label>
  <select name="PaymentMethod" id="PaymentMethod" onChange={handleSelect}>
  <option value="efectivo">Efectivo</option>
    <option value="mepago">MercadoPago</option>
    <option value="tarjeta">Tarjeta de credito/debito</option>
    <option value="transferencia">Transferencia</option>
  </select>

  <div>
      <button>Finalizar Compra</button>
  </div>

</div>
)
}

export default Payment;
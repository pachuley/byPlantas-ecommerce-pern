import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import styles from './payment.module.css'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const {REACT_APP_BACKEND_URL} = process.env;

const Payment = ({cart, productos, data }) =>{

const [payment, setPayment] = useState('efectivo')
const [datos, setDatos] = useState("")

  useEffect(()=>{
    axios
    .get("http://localhost:3001/mercadopago")
    .then((data)=>{
      console.log(data)
      setDatos(data.data)
      console.info('Contenido de data:', data)
    })
    .catch(err => console.error(err)) 
  },[])



//DIRECTO DE LA API DE MERCADOLIBRE - RENDERIZA EL BOTON DE PAGAR
useEffect(()=>{
  const script = document.createElement('script'); //Crea un elemento html script
  
  const attr_data_preference = document.createAttribute('data-preference-id') //Crea un nodo atribute
  attr_data_preference.value = datos.id  //Le asigna como valor el id que devuelve MP

  //Agrega atributos al elemento script
  script.src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";  
  script.setAttributeNode(attr_data_preference)  

  console.log(data)
  
  //Agrega el script como nodo hijo del elemento form
  document.getElementById('form1').appendChild(script)
  return () =>{
    //Elimina el script como nodo hijo del elemento form
    document.getElementById('form1').removeChild(script);
  }
 },[data])

//DIRECTO DE LA API DE MERCADOLIBRE






//
let totalPayment = 0;
cart.forEach(e=>totalPayment = (e.orderline.price * e.orderline.quantity) + totalPayment )
//
//payment status
const handleSelect = (event) => {
  setPayment(event.target.value)
}

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

<form id='form1'>

  <h4>PAGAR BUTTON</h4>
  
</form>

</div>
  <div>
      <button>Finalizar Compra</button>
  </div>

</div>
)
}

export default Payment;
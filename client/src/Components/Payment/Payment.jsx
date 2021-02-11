import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import styles from './payment.module.css'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const {REACT_APP_BACKEND_URL} = process.env;

const Payment = ({cart, productos, data}) =>{

const [payment, setPayment] = useState('mepago')
const [datos, setDatos] = useState("")



  useEffect(()=>{
    
    var data1 = [
      {title: "Producto 1", quantity: 5, price: 10.52},
      {title: "Producto 2", quantity: 15, price: 100.52},
      {title: "Producto 3", quantity: 6, price: 200}
    ]
    axios.post("http://localhost:3001/mercadopago", data1)
    .then((data)=>{
      console.log(data)
      setDatos(data.data)
      console.info('Contenido de data:', data)
    })
    .catch(err => console.error(err)) 
  },[])

console.log(datos)

//DIRECTO DE LA API DE MERCADOLIBRE - RENDERIZA EL BOTON DE PAGAR
useEffect(()=>{
  
  const script = document.createElement('script'); //Crea un elemento html script
  const attr_data_preference = document.createAttribute('data-preference-id') //Crea un nodo atribute

  
  attr_data_preference.value = datos.id  //Le asigna como valor el id que devuelve MP

  //Agrega atributos al elemento script
  script.src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";  
  script.setAttributeNode(attr_data_preference)  

  
  //Agrega el script como nodo hijo del elemento form
  document.getElementById('form1').appendChild(script)
  return () =>{
    //Elimina el script como nodo hijo del elemento form
    document.getElementById('form1').removeChild(script);
  }
 },[datos])

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



  <div>

<form id='form1'>

  
</form>

</div>
</div>
)
}

export default Payment;
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import styles from './payment.module.css'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const {REACT_APP_BACKEND_URL} = process.env;

const Payment = () =>{


const [datos, setDatos] = useState("")

const cartItems = useSelector(state => state.cart.cartItems)

console.log(cartItems)

  useEffect(()=>{
    
    axios.post("http://localhost:3001/mercadopago", cartItems)
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
  let flag;
  if(datos){
    flag = true
  }
  if(flag === true){
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
    flag = false;
  }
}},[datos])

//DIRECTO DE LA API DE MERCADOLIBRE
//
let totalPayment = 0;
cartItems.forEach(e=>totalPayment = e.total + totalPayment )
// //
//payment status


return (
  <div>
    <h4>Opciones de Pago</h4>
    <p className={`${styles.pagoTotal}`}>Total: ARS ${totalPayment}</p>
      <div>
        <span className={`${styles.mercadoPago}`}>MercadoPago</span>
        <form id='form1' className={`${styles.boton}`}>
        </form>
      </div>
    </div>
  )
}

export default Payment;
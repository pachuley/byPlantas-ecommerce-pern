import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import styles from "./checkout.module.css";
import CartCheckOut from "../CartCheckOut/CartCheckOut";
import { useSelector } from "react-redux";
import Payment from "../Payment/Payment";
import ShippingDetail from "../ShippingDetail/ShippingDetail";

const { REACT_APP_BACKEND_URL } = process.env;
const CheckOut = () => {
  //Levanto los datos del local para poder enviar con la variante config todos los datos del token
  //con la variante config, por eso la paso como parametro en config (el header)
  let userLocalstorage = JSON.parse(localStorage.getItem("userInfo"));
  let config = {
    headers: {
      "Content-Type": "application/json",
      token: userLocalstorage !== null ? userLocalstorage.token : null,
    },
  };

  //invocamos para saber si estamos loggeados desde redux
  const userLogin = useSelector((state) => state.userLogin);
  var logged = userLogin.userLogin;
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  

  //FORM
  //
  //
  function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'El nombre del receptor es obligatorio';
    } else if ((input.name.length <3)) {
        errors.name = 'Nombre invalido';
    }
    if (!input.lastname) {
    errors.lastname = 'El apellido del receptor es obligatorio';
    } else if ((input.lastname.length <3)) {
    errors.lastname = 'Apellido invalido';
    }
    if (!input.identifier) {
      errors.identifier = 'Ingrese la identificacion del receptor Ejemplo: 99.999.999 => ingresa 99999999';
  } else if ((input.identifier.length <7)) {
      errors.identifier = 'Identificador invalido';
  }
  if (!input.address) {
  errors.address = 'Ingrese la dirección de entrega';
  } else if ((input.address.length <5)) {
  errors.address = 'Dirección invalida';
  }
  if (!input.postalcode) {
    errors.postalcode = 'Ingrese el codigo postal de su dirección de entrega';
} else if ((input.postalcode.length <3)) {
    errors.postalcode = 'Codigo postal invalido';
}
if (!input.clarification) {
errors.clarification = 'Ingresar un detalle';
} else if ((input.clarification.length <1)) {
errors.clarification = 'Ingresar un detalle';
}
    
    return errors;
    };

    

    const [errors, setErrors] = React.useState({
      errors: "",
      
    });
    console.log(errors)
  const [input, setInput] = React.useState({
    name: '',
    lastname: '',
    identifier: '',
    address: '',
    postalcode: '',
    clarification: '',
  });

  const handleInputChange = (e) => {
    console.log(input)
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }
  const [btnDisabled, setbtnDisabled] = useState(true)

  console.log(errors)

  const handleSubmit = (e) => {
    e.preventDefault()
    let erroresestrueono = Object.keys(errors).length === 0
    Object.keys(errors).length === 0 ? setbtnDisabled(false) : setbtnDisabled(true)
    
  }


  //
  //

  
  return (
    <div className={`${styles.checkoutContainer}`}>
      <div>
        <h2 className={`m-0 text-left p-5`}>¿Estas listo para comprar?</h2>
      </div>
      <div className={`${styles.checkout}`}>
        <div className={`col-8`}>
          {cart ? (
            cartItems.map((product, index) => (
              <div key={index}>
                <CartCheckOut product={product} />
              </div>
            ))
          ) : (
            <h1>El carrito esta vacio</h1>
          )}
        </div>
        <div className="text-center container col-3">
          { btnDisabled ? '' :
          <Payment btnDisabled={btnDisabled}/>
         }
        </div>
      </div>
      <div className="text-center mt-2 container">
        <div>
        {/* disabled={Object.keys(errors).length > 0} */}
          <form onSubmit={handleSubmit} >
            <button type='submit' disabled={Object.keys(errors).length > 0}>Aceptar para pagar</button>
            <div>
              <label>Nombre:</label>
              <input
                className={`${errors.name && "danger"}`}
                type="text"
                name="name"
                onChange={handleInputChange}
                value={input.name}
              />
              {errors.name && <p className="danger">{errors.name}</p>}

              <label>Apellido:</label>
              <input
                className={`${errors.lastname && "danger"}`}
                type="text"
                name="lastname"
                onChange={handleInputChange}
                value={input.lastname}
              />
              {errors.lastname && <p className="danger">{errors.lastname}</p>}

              <label>Identificador:</label>
              <input
                className={`${errors.identifier && "danger"}`}
                type="text"
                name="identifier"
                onChange={handleInputChange}
                value={input.identifier}
              />
              {errors.identifier && <p className="danger">{errors.identifier}</p>}


              <label>Dirección:</label>
              <input
                className={`${errors.address && "danger"}`}
                type="text"
                name="address"
                onChange={handleInputChange}
                value={input.address}
              />
              {errors.address && <p className="danger">{errors.address}</p>}


              <label>Codigo Postal:</label>
              <input
                className={`${errors.postalcode && "danger"}`}
                type="text"
                name="postalcode"
                onChange={handleInputChange}
                value={input.postalcode}
              />
              {errors.postalcode && <p className="danger">{errors.postalcode}</p>}


              <label>Aclaración:</label>
              <input
                className={`${errors.clarification && "danger"}`}
                type="text"
                name="clarification"
                onChange={handleInputChange}
                value={input.clarification}
              />
              {errors.clarification && <p className="danger">{errors.clarification}</p>}
              
            
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

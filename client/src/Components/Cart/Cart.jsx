import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import CartLine from '../CartLine/CartLine'
const {REACT_APP_BACKEND_URL} = process.env;

function Cart ({guestId}){
    const [cart, setCart] = useState([])
    
    const datos = [
        {
          "Nombre": "Shampoo Dove Regeneraci�n Extrema 400ml",
          "Descripcion": "Descubre el Nuevo Dove Regeneraci�n Extrema. Un concentrado poderoso de ingredientes activos regeneradores que nutren profundamente la fibra capilar activando el proceso de regeneraci�n interna del cabello**. Mejora la condici�n del cabello, para un crecimiento sano y para un nuevo comienzo. **Refuerza la estructura interna del cabello, con el uso regular de shampoo y acondicionador Dove Regeneraci�n Extrema, comparado con shampoo sin ingredientes acondicionadores.",
          "Precio": "414,56",
          "Stock": 10,
          "URL": "https://walmartar.vteximg.com.br/arquivos/ids/858838-1000-1000/Shampoo-Dove-Regeneracion-Extrema-400ml-1-469738.jpg?v=637190498256200000",
          "Categoria": "Cuidado Personal",
          "Descripcion categoria": "Cuidado Personal en el cuerpo"
        },
        {
          "Nombre": "Shampoo Pantene Pro-V Restauraci�n 300ml",
          "Descripcion": "Las puntas del cabello pierden hasta 3 veces m�s prote�nas que las ra�ces. La f�rmula PANTENE PRO-V con Pro-Vitaminas ayuda a reducir la p�rdida de prote�nas y a reparar las cut�culas para prevenir las puntas abiertas.\"\n\n\"Indicaciones:\nAplique sobre el cabello mojado, masajee suavemente el cuero cabelludo con las puntas de los dedos de forma circular, enjuague y repita si es necesario. \" \"Advertencias:\nEv�tese el contacto con los ojos, suspenda su uso si observa alguna reacci�n desfavorable, mant�ngase fuera del alcance de los ni�os. \" \"Caracter�ticas y Beneficios:\n� Ayuda a reparar el da�o desde el primer uso*\n� Tecnolog�a inteligente que act�a donde el cabello m�s lo necesita\n� Cabello largo y m�s fuerte hasta las puntas**\n� Los shampoos reformulados Pantene son ligeros y se enjuagan f�cilmente sin restar volumen ni dejar una sensaci�n pegajosa\n� Pantene, la marca n�mero 1 en el mundo en Cuidado del Cabello\n� Fuerza es belleza\n� Para una restauraci�n completa en tu cabello utiliza toda la l�nea Pantene Restauraci�n\n*Da�o al brillo y suavidad por decoloraci�n. Usando Sistema Pantene. **Fuerza contra el da�o mec�nico vs. shampoo sin ingredientes acondicionadores. [C�lculo de P&G basado en data de ventas de Julio 2015 a Junio 2016\"",
          "Precio": "640",
          "Stock": 5,
          "URL": "https://walmartar.vteximg.com.br/arquivos/ids/876212-1000-1000/Shampoo-Pantene-Pro-V-Restauraci-n-300ml-1-155408.jpg?v=637383871549470000",
          "Categoria": "Cuidado Personal",
          "Descripcion categoria": "Cuidado Personal en el cuerpo"
        },
        {
          "Nombre": "Nueces Peladas Great Value 100gr",
          "Descripcion": "Nueces Peladas Great Value 100gr",
          "Precio": "360",
          "Stock": 6,
          "URL": "https://walmartar.vteximg.com.br/arquivos/ids/870716-1000-1000/Nueces-Peladas-Great-Value-100gr-1-473520.jpg?v=637326702149900000",
          "Categoria": "Alimentos",
          "Descripcion categoria": "Alimentos"
        },
        {
          "Nombre": "Hueso Small Vaquero 1 Un",
          "Descripcion": "Hueso Small Vaquero 1 Un",
          "Precio": "234",
          "Stock": 4,
          "URL": "https://walmartar.vteximg.com.br/arquivos/ids/164085-1000-1000/0779818208501-1.jpg?v=635833144433200000",
          "Categoria": "Mascotas",
          "Descripcion categoria": "Mascotas"
        },
        {
          "Nombre": "Roll De Cuero 9/10 Vaquero 1 Un",
          "Descripcion": "Roll De Cuero 9/10 Vaquero 1 Un\nVAQUERO ROLL DE CUERO 9/10 1UN",
          "Precio": "300",
          "Stock": 1,
          "URL": "https://walmartar.vteximg.com.br/arquivos/ids/787370-1000-1000/0779818208520-1.jpg?v=635948174731900000",
          "Categoria": "Mascotas",
          "Descripcion categoria": "Mascotas"
        },
        {
          "Nombre": "Mix De Man�, Almendras Y Pasas Croppers X35gr",
          "Descripcion": "Mix De Man�, Almendras Y Pasas Croppers X35gr\nMix de man� sin piel tostado y sin sal, almendras tostadas y pasas de uva negras.\nMan� Mix Croppers 35 GR\n\nIngredientes: Man�, almendras y pasas de uva.",
          "Precio": "43",
          "Stock": 6,
          "URL": "https://walmartar.vteximg.com.br/arquivos/ids/875184-1000-1000/Mix-De-Man-Almendras-Y-Pasas-Croppers-X35gr-1-474840.jpg?v=637377781018330000",
          "Categoria": "Alimentos",
          "Descripcion categoria": "Alimentos"
        },
        {
          "Nombre": "Ciruelas Sin Carozo Doypack Great Value 200 Gr",
          "Descripcion": "Ciruelas Sin Carozo Doypack Great Value 200 Gr",
          "Precio": "139,4",
          "Stock": 1,
          "URL": "https://walmartar.vteximg.com.br/arquivos/ids/853838-1000-1000/Ciruelas-Sin-Carozo-Doypack-Great-Value-200-Gr-1-469133.jpg?v=637129919353300000",
          "Categoria": "Alimentos",
          "Descripcion categoria": "Alimentos"
        }
       ]

    // verificar si hay un usuario logueado y si no usar el carrito como guest, corroborarlo en el store
    useEffect(()=>{
        console.log(guestId)
        axios.get(`${REACT_APP_BACKEND_URL}/users/${guestId}/cart`)
        .then(resp=>{
            setCart(resp.data[0].products)
            console.log(resp.data[0].products)
        })
        // localStorage.setItem('objetus', JSON.stringify(datos))
        // const storage = JSON.parse(localStorage.getItem('objetus'))
        // setCart(storage)
    }, [])
    return (
        <div className='row'>
            {cart.map((product,index)=>(
                <div key={index} className='col-4' >
                    <CartLine product={product}/>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    guestId : state.firstReducer.guestId
})
const mapDispatchToProps = dispatch => ({}) 


export default connect(mapStateToProps, mapDispatchToProps) (Cart)
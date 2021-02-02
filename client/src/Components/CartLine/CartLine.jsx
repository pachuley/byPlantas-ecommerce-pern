import axios from 'axios'
import React, {useState} from 'react'
import { connect } from 'react-redux'
const {REACT_APP_BACKEND_URL} = process.env;

function CartLine ({product, imgs, userId}){
    const [logged, setlogged] = useState(JSON.parse(localStorage.getItem('Login')))
    const [contador, setContador] = useState(logged ? product.orderline.quantity : product.quantity)
    
    const handleDelete = (productID) =>{
        if(!logged){
          let dataStorage = JSON.parse(localStorage.getItem('Cart'))
          let data = dataStorage.Products.filter(x=>x.id !== productID)
          localStorage.setItem('Cart', JSON.stringify({Products: data}))
          window.location = '/cart'
          alert('El Producto se elimino del carrito')
        }else{
          axios.delete(`${REACT_APP_BACKEND_URL}/users/${logged.userId}/cart/${productID}`)
          .then(res=>{
            console.log(res);
            window.location = '/cart'
            alert('El Producto se elimino del carrito')
        })
        }
    }
    const handleSuma = () => {
        setContador(contador + 1)
        logged ? 
        axios.put(`${REACT_APP_BACKEND_URL}/users/${logged.userId}/cart/${product.id}`, {contador:contador + 1})
        : handleSumaGuest()
    }
    const handleSumaGuest = () => {
        var dataStorage = JSON.parse(localStorage.getItem('Cart'))
        let data = dataStorage.Products.map(x=>{
            if(x.id == product.id){x.quantity = contador + 1}return x
        })
        localStorage.setItem('Cart', JSON.stringify({Products: data}))
    }

    const handleResta = () => {
        setContador(contador - 1)
        logged ? 
        axios.put(`${REACT_APP_BACKEND_URL}/users/${logged.userId}/cart/${product.id}`, {contador:contador - 1})
        : handleRestaGuest()
    }
    const handleRestaGuest = () => {
        var dataStorage = JSON.parse(localStorage.getItem('Cart'))
        let data = dataStorage.Products.map(x=>{
            if(x.id == product.id){x.quantity = contador - 1}return x
        })
        localStorage.setItem('Cart', JSON.stringify({Products: data}))
    }


    return (
        <div className='card container'>
            <div className='row'>
                <img 
                    src={`${product.imgs ? product.imgs : 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png'}`} 
                    alt="" className="img-fluid col-5"
                />
                <div className='col-6'>
                    <p className=''>{product.name}</p>
                    <p className="">ARS$ {logged ? product.price : product.price}</p>
                    <p className="">Cantidad: {contador}</p>
                    <button onClick={handleSuma}>+</button>
                    <button onClick={handleResta}>-</button>
                    <p>Total: {logged ? product.price * product.orderline.quantity : product.price * product.quantity}</p>
                </div>
                <div className='col-1'>
                    <button className='btn btn-danger float rounded-circle' onClick={()=> handleDelete(product.id)}>X</button>
                </div>
                
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    userId: state.firstReducer.userId
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CartLine)
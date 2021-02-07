import axios from 'axios'
import React, {useState} from 'react'
import { connect } from 'react-redux'
import styles from './cartline.module.css'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const {REACT_APP_BACKEND_URL} = process.env;

function CartLine ({product, imgs, userId}){
    let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'token': userLocalstorage !== null ? userLocalstorage.token : null
      },
    };

    //invocamos para saber si estamos loggeados desde redux
  const userLogin = useSelector(state => state.userLogin)
  var logged =  userLogin.userLogin

    
    const [contador, setContador] = useState(logged ? product.orderline.quantity : product.quantity)
    const [totalGuest, setTotalGuest] = useState(logged ? product.orderline.quantity : product.price * product.quantity)

    const handleDelete = (productID) =>{
        if(!logged){
          let dataStorage = JSON.parse(localStorage.getItem('Cart'))
          let data = dataStorage.Products.filter(x=>x.id !== productID)
          localStorage.setItem('Cart', JSON.stringify({Products: data}))
          window.location = '/cart'
          Swal.fire({
            title: `El producto se elimino del carrito`,
            icon: 'info'
          })
        }else{
          axios.delete(`${REACT_APP_BACKEND_URL}/users/${logged.id}/cart/${productID}`, config)
          .then(res=>{
            console.log(res);
            window.location = '/cart'
            Swal.fire({
                title: `El producto se elimino del carrito`,
                icon: 'info'
              })
        })
        }
    }
    const handleSuma = () => {
        setContador(contador + 1)
        logged ? 
        axios.put(`${REACT_APP_BACKEND_URL}/users/${logged.userId}/cart/${product.id}`, {contador:contador + 1}, config)
        : handleSumaGuest()
    }
    const handleSumaGuest = () => {
        var dataStorage = JSON.parse(localStorage.getItem('Cart'))
        let data = dataStorage.Products.map(x=>{
            if(x.id == product.id){x.quantity = contador + 1}return x
        })
        
        setTotalGuest(product.price * contador)
        localStorage.setItem('Cart', JSON.stringify({Products: data}))
    }

    const handleResta = () => {
        setContador(contador - 1)
        logged ? 
        axios.put(`${REACT_APP_BACKEND_URL}/users/${logged.userId}/cart/${product.id}`, {contador:contador - 1}, config)
        : handleRestaGuest()
    }
    const handleRestaGuest = () => {
        var dataStorage = JSON.parse(localStorage.getItem('Cart'))
        let data = dataStorage.Products.map(x=>{
            if(x.id == product.id){
                x.quantity = contador - 1
            }
            return x
        })
        console.log(contador)
        setTotalGuest(product.price * contador)
        localStorage.setItem('Cart', JSON.stringify({Products: data}))
    }


    return (
        <div>
            <div className={`container ${styles.containerCartline}`}>
                <div className={`${styles.imgContainer}`}>
                    <img 
                        src={`${product.imgs ? product.imgs : 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png'}`} 
                        alt="" className={`${styles.imgCartline}`}
                    />
                    { logged ?
                    <div>
                        <button className={`rounded-circles ${styles.btnContador}`} onClick={handleResta}>-</button>
                        <button className={`rounded-circles ${styles.btnContador}`} onClick={handleSuma}>+</button>

                    </div>
                    : "" }
                </div>
                <div className={`container ${styles.detailsContainer}`}>
                    <div className=''>
                        <h6 className={`${styles.productName}`}>{product.name}</h6>
                    </div>
                    <div className={`container ${styles.productDetails}`}>
                        <span className=""> ARS$ {logged ? product.price : product.price} </span>
                        <span className=""> Cantidad: {contador} </span>
                        <span> Total: {logged ? product.price * contador : totalGuest} </span>
                        {/* product.price * product.orderline.quantity */}
                    </div>
                </div>
            </div>
            <div>
                <button className={`btn ${styles.btnCloseByPlantas} float pull-right rounded-circle`} onClick={()=> handleDelete(product.id)}>X</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    userId: state.firstReducer.userId
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CartLine)
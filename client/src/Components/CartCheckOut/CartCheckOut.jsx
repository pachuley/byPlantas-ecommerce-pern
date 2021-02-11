import axios from 'axios'
import React, {useState} from 'react'
import { connect } from 'react-redux'
import styles from './cartcheckout.module.css'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const {REACT_APP_BACKEND_URL} = process.env;

const CartCheckOut = ({product, imgs, userId}) =>{
console.log(product)

    //invocamos para saber si estamos loggeados desde redux
  const userLogin = useSelector(state => state.userLogin)
  var logged =  userLogin.userLogin

    
    const [contador, setContador] = useState(logged ? product.orderline.quantity : product.quantity)
    const [totalGuest, setTotalGuest] = useState(logged ? product.orderline.quantity : product.price * product.quantity)

    


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
        
            </div>
        </div>
    )
}


export default CartCheckOut;
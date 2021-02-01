import axios from 'axios'
import React, {useState} from 'react'
import { connect } from 'react-redux'
const {REACT_APP_BACKEND_URL} = process.env;

function CartLine ({product, imgs, userId}){
    const [logged, setlogged] = useState(JSON.parse(localStorage.getItem('Login')))
    

    return (
        <div className='card container'>
            <div className='row'>
                <img 
                    src={`${product.imgs ? product.imgs : 'https://cdn.iconscout.com/icon/premium/png-256-thumb/coming-soon-label-842108.png'}`} 
                    alt="" className="img-fluid col-5"
                />
                <div className='col-7'>
                    <p className=''>{product.name}</p>
                    <p className="">ARS$ {logged ? product.price : product.price}</p>
                    <p className="">Cantidad: {logged ? product.orderline.quantity : product.quantity}</p>
                    <p>Total: {logged ? product.price * product.orderline.quantity : product.price * product.quantity}</p>
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
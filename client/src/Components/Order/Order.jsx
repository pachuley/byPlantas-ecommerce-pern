import React,{Fragment,useEffect,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const {REACT_APP_BACKEND_URL} = process.env;

export default function Order({match}) {
    const [order, setOrder] = useState({})
    const [fecha,setFecha] = useState('')
    const [hora,setHora] = useState('')
    
    useEffect(()=>{
        getOrder()
    },[])
    const getOrder = () => {
        console.log('order')
        axios.get(`${REACT_APP_BACKEND_URL}/orders/${match.params.id}/orders`)
            .then(res => {
                setOrder(res.data[0])
                setFecha(res.data[0].createdAt.split('T',1))
                setHora(res.data[0].createdAt.substr(11).split('.',1))
            })
    }
    const orderMount = () => {
        if (!order.products) return 0
        return order.products.reduce((acc, product) => 
            acc + Number(product.order.price) * Number(product.order.quantity)
        , 0)
    }
    return(
        <Fragment>
            <div className="container mt-5">
            <button className={`btn btn-dark`}><Link className={`text-light`} to={`/orders`}>Atras</Link></button>
                <h2 className={`text-center`}>Orden del usuario {order.userId}</h2>
                <div className="container d-flex mt-5 border">
                    <div className="col-md-4 border border-light">
                        <h2 className={`text-center pt-5`}>Order ID: <span>{order.id}</span></h2>
                    </div>
                    <div className="col-md-8  p-3">
                        <h3>Status: <span>{order.status}</span></h3>
                        <h3>Fecha de compra: <span>{fecha}</span> Hora : <span>{hora}</span></h3>
                        <h3>Productos:{order.products!==undefined && order.products.length !==0 ? order.products.map(product=>(
                            <h1><span>{product.name}</span><span>{product.price}</span></h1>
                        ))
                        :<span> No hay productos</span>
                        }</h3>
                        <h3>Total de Compra: <span>{orderMount()}</span></h3>
                        <button className={`btn btn-warning`}>Edit</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
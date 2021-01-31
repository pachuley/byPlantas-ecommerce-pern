import React, { useEffect, useState } from 'react';
import './orderTable.module.css';
import axios from 'axios'
import Order from '../Order/Order'

const {REACT_APP_BACKEND_URL} = process.env;




export default function OrderTable({match}) {
    

    const [orders, setOrders] = useState({})
        useEffect(()=>{
            getOrders()
        }, [])
        const getOrders = () => {
            axios.get(`${REACT_APP_BACKEND_URL}/order/orders`)
            .then(res => {
                console.log(res.data)
                setOrders(res.data[0])
            })
        }
        console.log("orders " + orders)
    return (
        <div className="container tabla">
            <div className="col-md-10 panel-right row tabla" style={{ paddingTop: '25px' }}>
            <div className="col-md-12 col-lg-12">
                <h2 className="text-center">Todas las Ordenes</h2>
                <table className="table table-hover table-dark thfontsize">
                    <thead>
                        <tr>
                            <th scope="col">Id Usuario</th>
                            <th scope="col">Id Order</th>
                            <th scope="col">Status</th>
                            <th scope="col">Monto Total</th>
                            <th scope="col">F. Compra</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {orders.map(order=> <Order 
                        idUser={order.idUser}
                        idOrder={order.idOrder}
                        status={order.status}
                        total={order.total}
                        date={order.date} />)} */}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}
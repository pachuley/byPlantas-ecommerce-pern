import React from 'react';
import './orderTable.module.css';
import Order from '../Order/Order'
// import axios from 'axios';



export default function OrderTable() {
    const orders = [
        {idUser:1,
            idOrder:1,
            status:'cart',
            total:100,
            date:'02/04/11'},
        {idUser:1,
            idOrder:2,
            status:'cart',
            total:100,
            date:'02/04/11'},
        {idUser:1,
            idOrder:3,
            status:'cart',
            total:100,
            date:'02/04/11'},
        {idUser:1,
            idOrder:4,
            status:'cart',
            total:100,
            date:'02/04/11'}        
        ]
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
                        {orders.map(order=> <Order 
                        idUser={order.idUser}
                        idOrder={order.idOrder}
                        status={order.status}
                        total={order.total}
                        date={order.date} />)}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}
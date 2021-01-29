import React,{Fragment} from 'react';
// import style from './Order.module.css'; 

export default function Order(order) {
    const orderMount = () => {
        if (!order.products) return 0
        return order.products.reduce((acc, product) => 
            acc + Number(product.order.price) * Number(product.order.quantity)
        , 0)
    }
    return(
        <Fragment>
        <tr key={order.idOrder}>
            <td>{order.idUser}</td>
            <td>{order.idOrder}</td>
            <td>{order.status}</td>
            <td>{order.total}</td>
            <td>{order.date}</td>
        </tr>    
        </Fragment>
    )
}
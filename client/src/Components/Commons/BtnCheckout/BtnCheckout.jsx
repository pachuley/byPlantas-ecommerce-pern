import React from 'react';
import {Link} from 'react-router-dom'
import styles from './btncheckout.module.css'
const BtnCheckout = ({orderId,disabled,handleCheckout}) => {
    let disabledLink = disabled ? styles.disabledlink : ''

    return ( 
        <div>
            <Link 
                className="btn btn-sm btnByPlantas"
                to={`/checkout/${orderId}`} 
                className={`${disabledLink} btn btn-sm btnByPlantas`}   
                onClick={handleCheckout}
            >
                Checkout
            </Link>
        </div>
     );
}
 
export default BtnCheckout;
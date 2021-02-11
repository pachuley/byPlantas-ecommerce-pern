import React from 'react';
import {Link} from 'react-router-dom'
import styles from './btncheckout.module.css'
const BtnCheckout = ({orderId,disabled,handleCheckout}) => {
    let disabledLink = disabled ? styles.disabledlink : ''

    return ( 
        <div>
            <Link 
                className="btn btn-sm btn-secondary"
                to={`/checkout/${orderId}`} 
                className={`${disabledLink} btn btn-sm btn-secondary`}   
                onClick={handleCheckout}
            >
                Checkout
            </Link>
        </div>
     );
}
 
export default BtnCheckout;
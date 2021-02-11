import React from 'react';
import {Link} from 'react-router-dom'
import styles from './btncheckout.module.css'
const BtnCheckout = ({orderId,disabled}) => {
    let disabledLink = disabled ? styles.disabledlink : ''
    return ( 
        <div>
            <Link 
                className="btn btn-sm btn-secondary"
                to={`/checkout/${orderId}`} 
                className={`${disabledLink} btn btn-sm btn-secondary`}   
            >
                Checkout
            </Link>
        </div>
     );
}
 
export default BtnCheckout;
import React from 'react';
import {Link} from 'react-router-dom'
import styles from './btncheckout.module.css'
const BtnCheckout = ({disabled,handleCheckout}) => {
    let disabledLink = disabled ? styles.disabledlink : ''

    return ( 
        <div> 
            <button 
                className="btn btn-sm btn-secondary"
                className={`${disabledLink} btn btn-sm btn-secondary`}   
                onClick={handleCheckout}
            >
                Checkout
            </button>
        </div>
     );
}
 
export default BtnCheckout;
import React from 'react';
import {Link} from 'react-router-dom'
const BtnCheckout = ({orderId}) => {
    return ( 
        <div>
            <Link 
                className="btn btn-sm btn-secondary"
                to={`/checkout/${orderId}`}    
            >
                Checkout
            </Link>
        </div>
     );
}
 
export default BtnCheckout;
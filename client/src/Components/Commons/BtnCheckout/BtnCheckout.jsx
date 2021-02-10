import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchOrder} from '../../../Redux/actions/orderCheckAction'

const BtnCheckout = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchOrder)
    },[])
    const handle = () => {
        dispatch(fetchOrder())
    }
    return ( 
        <div>
            <button className="btn btn-sm btn-secondary" onClick={handle}>
                Checkout
            </button>
        </div>
     );
}
 
export default BtnCheckout;
import axios from 'axios'
import React, {useState} from 'react'
import { connect } from 'react-redux'
import styles from './shippingdetail.module.css'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

const {REACT_APP_BACKEND_URL} = process.env;

const ShippingDetail = ({product, imgs, userId}) =>{
console.log(imgs)

return (


<div>
    SHIPPING DETAIL
</div>
)
}

export default ShippingDetail;
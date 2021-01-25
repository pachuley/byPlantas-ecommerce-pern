import React from 'react';
import styles from './productCard.module.css'
import { NavLink } from 'react-router-dom';

const ProductCard = ({ 
    nameProduct, 
    descriptionProduct, 
    priceProduct, 
    urlProduct, 
    stockProduct, 
    id
}) => {
    return (
        <div className={`card ${styles.cardContainer}`}>
            <NavLink to={`/products/${id}`}>
                <img className={`card-img-top ${styles.img}`} src={urlProduct}/>
                <div className={`card-body ${styles.textContainer}`}>
                    <ul className={`list-group list-group-flush`}>
                        <li className={`list-group-item`}><h5 className={`card-title`}>{nameProduct}</h5></li>
                        <li className={`list-group-item`}>ARS {priceProduct}</li>
                        <li className={`list-group-item`}>{stockProduct}</li>
                    </ul>
                </div>
            </NavLink>
        </div>
    )
}
export default ProductCard;
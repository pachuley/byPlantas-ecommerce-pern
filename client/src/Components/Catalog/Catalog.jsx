
import React, {useState, useEffect} from 'react';
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';
const {REACT_APP_BACKEND_URL} = process.env;
// levanto los datos de forma local para probar, se debe cambiar


const Catalog = ({products}) => { 
    return (
        <div className='Catalog'>
            <h5 className={`m-0 text-center`}>Productos</h5>
            <hr/>
            <div className="d-flex justify-content-around flex-wrap">
                {products.map(product=> <ProductCard
                key={product.id}
                id = {product.id}
                nameProduct = {product.nameProduct}
                descriptionProduct = {product.descriptionProduct}
                priceProduct = {product.priceProduct}
                stockProducts = {product.stockProduct}
                urlProduct = {product.urlProduct}
                />)}
            </div>
        </div>
    )

}

export default Catalog;
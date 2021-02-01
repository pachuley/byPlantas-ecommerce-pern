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
            <div className="row">
                {products.map((product, index)=> 
                <div key={index} className="col-4">
                    <ProductCard
                    key={product.id}
                    id = {product.id}
                    name = {product.name}
                    description = {product.description}
                    price = {product.price}
                    stock = {product.stock}
                    imgs = {product.imgs}
                    />
                </div>
                )}
            </div>
        </div>
    )
}

export default Catalog;
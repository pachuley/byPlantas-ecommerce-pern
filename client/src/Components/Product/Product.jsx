import React, {useState, useEffect} from 'react';
import ProductCard from '../ProductCard/ProductCard';
// import axios from 'axios';

// levanto los datos de forma local para probar, se debe cambiar
const data = require("./productsTestFront.json");

const ProductContainer = () => {

    const [ products, setProducts ] = useState([])
    
    useEffect(()=>{
        // axios.get(data)
        // .then(resp=>{
        //     console.log(resp)
            setProducts(data);
            return ()=>{
                setProducts([])
            }
        }, [])
    
    // , []
    // )
// pongo, []) porque no voy a recibir callbacks

    return (
        <div className='productContainer'>
            {data.map(product=> <ProductCard
            id = {product._id}
            nameProduct = {product.nameProduct}
            descriptionProduct = {product.descriptionProduct}
            priceProduct = {product.priceProduct}
            stockProducts = {product.stockProduct}
            urlProduct = {product.urlProduct}
            />)}

        </div>
    )

}

export default ProductContainer;
import React, {Fragment, useEffect, useState} from 'react';
import style from './catalogContainer.module.css'
import axios from 'axios'
import Catalog from '../Catalog/Catalog'
import FiltersContainer from '../FiltersContainer/FiltersContainer'

const {REACT_APP_BACKEND_URL} = process.env;


const CatalogContainer = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [categorySelected, setCategorySelected] = useState('')

    useEffect(()=>{
        axios.get(`${REACT_APP_BACKEND_URL}/category`)
        .then(resp=>{
            setCategories(resp.data)
        })
        .catch(error=>{

        })

        axios.get(`${REACT_APP_BACKEND_URL}/products`)
        .then(resp=>{
            setProducts(resp.data)
        })
        .catch(error=>{

        })
    }, [])

    const handleCategory = (category) => {
        setCategorySelected(category.name)
    }

    const listProducts = () => {
        let arrRes = []
        let exist = false
        if(!categorySelected){
            return products
        }
        products.forEach(product => {
            exist = product.categories.some (prodCat => prodCat.name === categorySelected)
            if(exist){
                arrRes.push(product)
            }
        })
        return arrRes
    }
    
    return ( 
        <Fragment>
            <div className="container-fluid m-5">
                <div className="row">
                    <div className={`col-2 p-2 ${style.border}`}>
                        <FiltersContainer 
                            categories={categories}
                            handleCategory={handleCategory}
                            categorySelected={categorySelected}
                        />
                    </div>
                    <div className={`col-10 p-2`}>
                        <Catalog 
                            products={listProducts()}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
     );
}
 
export default CatalogContainer;
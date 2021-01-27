import React, {Fragment, useEffect, useState} from 'react';
import style from './catalogContainer.module.css'
import axios from 'axios'
import Catalog from '../Catalog/Catalog'
import FiltersContainer from '../FiltersContainer/FiltersContainer'
import Spinner from '../Spinner/Spinner'

const {REACT_APP_BACKEND_URL} = process.env;

/* 
    Componente contenedor de los filtros y el listado del catalogo
*/
const CatalogContainer = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [categorySelected, setCategorySelected] = useState('')
    const [inpfilter, setInpfilter] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        getProducts()
        getCategories()
    }, [])
    
    const getCategories = () => {
        setLoading(true)
        axios.get(`${REACT_APP_BACKEND_URL}/category`)
            .then(res => {
                setCategories(res.data)
                setLoading(false)
            })
    }
    const getProducts = async () => {
        setLoading(true)
        axios.get(`${REACT_APP_BACKEND_URL}/products`)
            .then(res => {
                setProducts(res.data)
                setLoading(false)
            })
    }

    const handleCategory = (category) => {
        setCategorySelected(category.name)
    }
    const handleInputFilter = (event) => {
        setInpfilter(event.target.value)
    }
    /* (product.name.concat(product.description)).toLowerCase().includes(inpfilter.toLocaleLowerCase()) */
    const productsFiltered = () => {
        if(!categorySelected && !inpfilter){
            return products.filter(product => 
                (product.stock > 0))
        }
        if(!categorySelected && inpfilter){
            return products.filter(product => 
                (product.stock > 0) && (product.name.concat(product.description)).toLowerCase().includes(inpfilter.toLocaleLowerCase()))
        }
        return products.filter(product => {
            return product.categories.some(cat => cat.name === categorySelected) && (product.name.concat(product.description)).toLowerCase().includes(inpfilter.toLocaleLowerCase())
        })
    }
    const handleCleanFilters = () => {
        setCategorySelected('')
        setInpfilter('')
    }
    
    return ( 
        <Fragment>
            {loading ? 
                <Spinner />
                    :
                    <div className="container my-5">
                        <div className="row pt-5">
                            <div className={`col-3 p-2 ${style.border}`}>
                                <FiltersContainer 
                                    categories={categories}
                                    handleCategory={handleCategory}
                                    categorySelected={categorySelected}
                                    handleInputFilter={handleInputFilter}
                                    handleCleanFilters={handleCleanFilters}
                                    value={inpfilter}
                                />
                            </div>
                            <div className={`col-9 p-2`}>
                                <Catalog 
                                    products={productsFiltered()}
                                />
                            </div>
                        </div>
                    </div>
            }
        </Fragment>
     );
}
 
export default CatalogContainer;
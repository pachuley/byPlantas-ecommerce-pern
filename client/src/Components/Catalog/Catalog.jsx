import React, {useState} from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Pagination from '../Commons/Pagination/Pagination'
import {paginate} from '../../utils/pagination'
// levanto los datos de forma local para probar, se debe cambiar


const Catalog = ({products}) => { 
    const [currentpage, setCurrentpage] = useState(1)
    const handlePageChange = (page) => {
        setCurrentpage(page)
    }
    const productsPag = paginate(products, currentpage, 9)
    return (
        <div className='Catalog'>
            {products.length === 0 ? 
                <p className="p-2 mb-2 bg-warning text-dark w-50">
                    No se encontraron productos con esos parámetros
                </p>
            :
                <>
                    <hr/>
                    <div className="row">
                        {productsPag.map(product=> 
                        <div className="col-4">
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
                    <div className="d-flex py-2 justify-content-center">
                        <Pagination
                            itemsCount = {products.length}
                            pageSize = {9}
                            onPageChange={handlePageChange}
                            currentPage={currentpage}
                        />
                    </div>
                </>           
            }
        </div>
    )
}

export default Catalog;
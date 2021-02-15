import React, {Fragment} from 'react';
import CategoriesFilter from '../CategoriesFilters/CategoriesFilters'
import InputFilter from '../InputFilter/InputFilter'
import styles from './filterscontainer.module.css'

const FiltersContainer = (
    {categories,handleCategory,categorySelected,handleInputFilter, handleCleanFilters, value, count, sortProducts}) => {
    
    return ( 
        <Fragment>
            <div className="d-flex justify-content-between align-items-center">
                <div className={`${styles.searchBarContainer}`}>
                    <div className={`${styles.searchBar}`}>
                        <span>
                            ({count}){count === 1 ? ' Producto' : ' Productos'}
                        </span>
                    </div>
                    <div>
                        <InputFilter 
                            handleInputFilter={handleInputFilter}
                            value={value}
                        />
                    </div>
                </div>
                <div className={`${styles.precioContainer}`}>
                    <div className="d-flex align-items-center">
                        <p className="m-0 px-2">Precio:</p>
                        <select 
                            className="form-control"
                            onChange={sortProducts}
                        >
                            <option>Precio</option>
                            <option value="menorPrecio">Menor precio</option>
                            <option value="mayorPrecio">Mayor precio</option>
                        </select>
                    </div>
                </div>
                <div className={`${styles.categoriesFilterContainer}`}>
                    <div className="">
                        <CategoriesFilter 
                            categories={categories}
                            handleCategory={handleCategory}
                            categorySelected={categorySelected}
                        />
                    </div>
                </div>
                <div className={`${styles.buttonContainer}`}>
                    <button 
                        className={`${styles.btnLimpiar}`}
                        onClick={handleCleanFilters}>
                        Limpiar
                    </button>
                </div>
            </div>
        </Fragment>
     );
}
 
export default FiltersContainer;
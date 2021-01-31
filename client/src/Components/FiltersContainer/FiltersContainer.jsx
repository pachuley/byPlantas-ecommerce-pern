import React, {Fragment} from 'react';
import CategoriesFilter from '../CategoriesFilters/CategoriesFilters'
import InputFilter from '../InputFilter/InputFilter'

const FiltersContainer = (
    {categories,handleCategory,categorySelected,handleInputFilter, handleCleanFilters, value, count, sortProducts}) => {
    
    return ( 
        <Fragment>
            {/* <h5 className={`m-0 text-center`}>Filtrar</h5>
            <hr/> */}
            {/* <SearchBar/> */}
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <p className="m-0">
                        ({count}){count === 1 ? ' Producto' : ' Productos'}
                    </p>
                </div>
                <div className="">
                    <InputFilter 
                        handleInputFilter={handleInputFilter}
                        value={value}
                    />
                </div>
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
                <div className="">
                    <CategoriesFilter 
                        categories={categories}
                        handleCategory={handleCategory}
                        categorySelected={categorySelected}
                    />
                </div>
                    <button 
                        className="btn btn-danger btn-sm my-2" 
                        onClick={handleCleanFilters}
                    >
                        Limpiar
                    </button>
            </div>
        </Fragment>
     );
}
 
export default FiltersContainer;
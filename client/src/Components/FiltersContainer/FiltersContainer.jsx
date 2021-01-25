import React, {Fragment} from 'react';
import CategoriesFilter from '../CategoriesFilters/CategoriesFilters'
import InputFilter from '../InputFilter/InputFilter'

const FiltersContainer = (
    {categories,handleCategory,categorySelected,handleInputFilter, handleCleanFilters, value}) => {
    
    return ( 
        <Fragment>
            <h5 className={`m-0 text-center`}>Filtrar</h5>
            <hr/>
            {/* <SearchBar/> */}
            <InputFilter 
                handleInputFilter={handleInputFilter}
                value={value}
            />
            <CategoriesFilter 
                categories={categories}
                handleCategory={handleCategory}
                categorySelected={categorySelected}
            />
            <button 
                className="btn btn-danger btn-sm my-2" 
                onClick={handleCleanFilters}
            >
                Limpiar
            </button>
        </Fragment>
     );
}
 
export default FiltersContainer;
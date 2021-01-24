import React, {Fragment} from 'react';
import CategoriesFilter from '../CategoriesFilters/CategoriesFilters'
import InputFilter from '../InputFilter/InputFilter'

const FiltersContainer = ({categories,handleCategory,categorySelected,handleInputFilter}) => {
    
    return ( 
        <Fragment>
            <h5 className={`m-0 text-center`}>Filtrar</h5>
            <hr/>
            {/* <SearchBar/> */}
            <InputFilter 
                handleInputFilter={handleInputFilter}
            />
            <CategoriesFilter 
                categories={categories}
                handleCategory={handleCategory}
                categorySelected={categorySelected}
            />
        </Fragment>
     );
}
 
export default FiltersContainer;
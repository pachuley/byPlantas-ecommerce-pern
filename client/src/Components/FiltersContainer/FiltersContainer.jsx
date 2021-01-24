import React, {Fragment} from 'react';
import SearchBar from '../SearchBar/SearchBar'
import CategoriesFilter from '../CategoriesFilters/CategoriesFilters'

const FiltersContainer = ({categories,handleCategory,categorySelected}) => {
    
    return ( 
        <Fragment>
            <h5 className={`m-0 text-center`}>Filtrar</h5>
            <hr/>
            <SearchBar/>
            <CategoriesFilter 
                categories={categories}
                handleCategory={handleCategory}
                categorySelected={categorySelected}
            />
        </Fragment>
     );
}
 
export default FiltersContainer;
import React, {Fragment} from 'react';

const CategoriesFilter = ({categories,handleCategory,categorySelected}) => {
    return ( 
        <Fragment>
            <h5>Categorías</h5>
            <ul className="list-group m-0">
                {categories.map(category => {
                    return <li  
                                className={category.name === categorySelected ? 
                                "list-group-item active m-0" : "list-group-item m-0"} 
                                onClick={() => handleCategory(category)}
                                key={category.id}
                            >
                                    {category.name}
                            </li>
                })}
            </ul>
        </Fragment>
     );
}
 
export default CategoriesFilter;
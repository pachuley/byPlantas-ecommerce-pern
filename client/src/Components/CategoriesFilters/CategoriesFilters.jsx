import React, {Fragment} from 'react';

const CategoriesFilter = ({categories,handleCategory,categorySelected}) => {
    return ( 
        <Fragment>
            <h5>Categorías</h5>
            <ul className="list-group">
                {categories.map(category => {
                    return <li  
                                className={category.name === categorySelected ? 
                                "list-group-item active" : "list-group-item"} 
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
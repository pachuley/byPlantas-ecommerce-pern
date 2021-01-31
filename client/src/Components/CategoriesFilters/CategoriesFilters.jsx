import React, {Fragment} from 'react';

const CategoriesFilter = ({categories,handleCategory,categorySelected}) => {
    return ( 
        <Fragment>
            <div className="d-flex align-items-center">
                <p className="m-0 px-2">Categorías: {" "}</p>
                <select 
                    className="form-control"
                    onChange={handleCategory}
                >
                    <option value="">Categorias</option>
                    {categories.map(category => {
                        return <option value={category.name}>{category.name}</option>
                    })}
                </select>

            </div>
        </Fragment>
     );
}
 
export default CategoriesFilter;
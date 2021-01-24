import React from 'react';

const InputFilter = ({handleInputFilter}) => {
    return ( 
        <input 
            type="text"
            className='my-1 form-control form-control-sm'
            name="inputSearchFilter"
            onChange={handleInputFilter}
            placeholder='Buscar producto...'
        />
     );
}
 
export default InputFilter;
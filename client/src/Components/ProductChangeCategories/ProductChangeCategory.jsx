import axios from 'axios';

import React, {Fragment, useState, useEffect} from 'react'
const {REACT_APP_BACKEND_URL} = process.env;


const ProductChangeCategory = ({cat}) => { 

    
  
 return ( 
   
     
      
            <div>
                {cat[0].name}
            
            </div>
    
 
  )
}


export default ProductChangeCategory;

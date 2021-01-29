import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
const {REACT_APP_BACKEND_URL} = process.env;


const Admins = (props) => {
  
  

  
    return (
        <div className="container">
          <div className="d-flex justify-content-end pb-2">
            <Link to='/addProduct' className="btn btn-sm btn-success mr-2">Link 1 ADMIN</Link>
            <Link to='/addCategory' className="btn btn-sm btn-success">LInk 2 admins</Link>
          </div>
        </div>
       
                            
                
            
    )}        


export default Admins;

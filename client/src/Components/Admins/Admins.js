import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
const {REACT_APP_BACKEND_URL} = process.env;


const Admins = (props) => {
  
  

  
    return (
        <div className="container">
          <div className="d-flex justify-content-center pb-2">
            <Link to='/admin' className="btn btn-sm btn-success mr-3">Link to ADMIN - List and controll Orders</Link>
            <Link to='/addCategory' className="btn btn-sm btn-success">Link to ADMIN - List and controll Users</Link>
          </div>
        </div>
       
                            
                
            
    )}        


export default Admins;

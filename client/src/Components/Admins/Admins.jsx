import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import styles from './admins.module.css'
import {Redirect} from 'react-router-dom'
import { useSelector} from 'react-redux'
const {REACT_APP_BACKEND_URL} = process.env;


const Admins = (props) => {
  //invocamos para saber si estamos loggeados desde redux
  const userLogin = useSelector(state => state.userLogin)
  var logged =  userLogin.userLogin

  
  let isAuth = userLogin.userLogin && userLogin.userLogin?.role === 'ADMIN_ROLE'
  return (
    isAuth ? 
      <div className = {`container`}>
        <div className={`containerByPlantas`}>
          <h2 className={`m-0 text-center p-5`}>Herramientas de Administrador</h2> 
          <div className={`${styles.adminButtonsContainer} justify-content-center`}> 
            <div className = {`m-2`}>
              <Link to='/admins/orders' className="btn btnByPlantas">Listar y modificar Ordenes</Link>
            </div>
            <div className='m-2'>
              <Link to='/users' className='btn btnByPlantas'>Listar y modificar Usuarios</Link>
            </div>
            <div className = {`m-2`}>
              <Link to='/productslist' className="btn btnByPlantas">Inventario de Productos y Categorias</Link>
            </div>
          </div>
        </div>
      </div>  
      :   
      <Redirect to={{
        pathname: '/login',
        state: {
          message: 'Debes estar logueado y ser ADMIN.'
        }
      }}/>
  )}        


export default Admins;

import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import styles from './admins.module.css'
const {REACT_APP_BACKEND_URL} = process.env;


const Admins = (props) => {

  return (
      <div className = {`container`}>
        <div className={`containerByPlantas`}>
          <h2 className={`m-0 text-center p-5`}>Herramientas de Administrador</h2> 
          <div className={`${styles.adminButtonsContainer} justify-content-center`}> 
            <div className = {`m-2`}>
              <Link to='/orders' className="btn btnByPlantas">Listar y modificar Ordenes</Link>
            </div>
            <div className = {`m-2`}>
              <Link to='/productslist' className="btn btnByPlantas">Inventario de Productos y Categorias</Link>
            </div>
          </div>
        </div>
      </div>     
  )}        


export default Admins;

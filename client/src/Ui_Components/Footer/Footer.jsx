import React from 'react';
import styles from './Footer.module.css'

const Footer = ()=>{
    return(
        <div className={`bg-dark fixed-bottom ${styles.divFooter}`} >
            <p className='text-white'>Henry E-Commerce Cohorte 08 Grupo 02</p>
            <p className='text-white-50'>byPlants 2021</p>
        </div>
    )
}

export default Footer
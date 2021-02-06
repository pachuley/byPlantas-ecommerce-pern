import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './navbar.module.css'
import Logout from '../Logout/Logout'
import { useDispatch, useSelector} from 'react-redux'
import {logout} from '../../Redux/actions/userActions'


const NavBar = () => {
    //invoco al Localstorage para levantar si el admin es true o no.
    let admin = localStorage.getItem('admin')
    //
    const userLogin = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    
    return (
        <header id="header" className={`fixed-top ${styles.header, styles.headerText}`}>
            <nav className={`navbar navbar-expand-lg ${styles.byPlantasNavbar}`} >
                <h1 className={`navbar-brand mr-auto ${styles.h1Margin, styles.headerLogo}`}><Link className={styles.linkLogo} to="/">byPlantas</Link></h1>
                <button className={`navbar-toggler`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={`navbar-toggler-icon`}></span>
                </button>
                <div className={`collapse navbar-collapse`}>
                    <ul className={`navbar-nav ${styles.ulMargin}`}>
                        <li className={`${styles.liMargin}`}>
                        
                            <NavLink className={styles.link} activeClassName={styles.alink} exact to="/products" >Catálogo</NavLink>
                            
                        </li>
                        <li className={`${styles.liMargin}`}>
                            {admin !== "true" ?
                            <NavLink className={styles.link} activeClassName={styles.alink} exact to="/cart" >Carrito</NavLink>
                            : ""}
                        </li>
                        <li className={`${styles.liMargin}`}>
                            {userLogin.userLogin ? (
                                <Logout />
                            ) : 
                            
                                <NavLink className={styles.link} activeClassName={styles.alink} exact to="/login" >LogIn</NavLink>
                            }
                        </li>
                        <li className={`${styles.liMargin}`}>
                        { admin === "true" ?
                            <NavLink className={styles.link} activeClassName={styles.alink} exact to="/admins" >Admin</NavLink>
                            : ""}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default NavBar
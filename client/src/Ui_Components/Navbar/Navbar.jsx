import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './navbar.module.css'
import Logout from '../Logout/Logout'
import { useSelector} from 'react-redux'

const NavBar = () => {
    const userLogin = useSelector(state => state.userLogin)
    const cartItems = useSelector(state => state.cart.cartItems)
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
                            {userLogin.userLogin === null || userLogin.userLogin.role !== "ADMIN_ROLE" ?
                                <li className={`${styles.liMargin}`}>
                                    <NavLink className={styles.link} activeClassName={styles.alink} exact to="/cart" >Carrito</NavLink>
                                    <span class="badge badge-info">{cartItems.length === 0 ? '' : cartItems.length}</span>
                                </li>
                            : ""}
                        { userLogin.userLogin && userLogin.userLogin.role === "ADMIN_ROLE" ?
                            <li className={`${styles.liMargin}`}>
                                <NavLink className={styles.link} activeClassName={styles.alink} exact to="/admins" >Admin</NavLink>
                            </li>
                            : ""}
                        <li className={`${styles.liMargin}`}>
                            {userLogin.userLogin ? 
                            (
                                <Logout />
                            ) : 
                                <NavLink className={styles.link} activeClassName={styles.alink} exact to="/login" >LogIn</NavLink>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default NavBar
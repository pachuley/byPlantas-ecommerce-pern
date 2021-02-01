import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css'
export default function NavBar() {
    //invoco al Localstorage para levantar si el admin es true o no.
    let admin = localStorage.getItem('admin')
    console.log(admin)
    //
    return (
        <header id="header" className={`fixed-top ${styles.header, styles.headerText}`}>
            <nav className={`navbar navbar-expand-lg ${styles.byPlantasNavbar}`} >
                <h1 className={`navbar-brand mr-auto ${styles.h1Margin, styles.headerLogo}`}><a className={styles.linkLogo} href="/">byPlantas</a></h1>
                <button className={`navbar-toggler`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={`navbar-toggler-icon`}></span>
                </button>
                <div className={`collapse ml-auto navbar-collapse`}>
                    <ul className={`navbar-nav ${styles.ulMargin}`}>
                        <li className={`${styles.liMargin}`}>
                            <NavLink className={styles.link} activeClassName={styles.alink} exact to="/products" >Catálogo</NavLink>
                        </li>
                        <li className={`${styles.liMargin}`}>
                            <NavLink className={styles.link} activeClassName={styles.alink} exact to="/account" >Cuenta</NavLink>
                        </li>
                        <li className={`${styles.liMargin}`}>
                        { admin === "true" ?
                            <NavLink className={styles.link} activeClassName={styles.alink} exact to="/admins" >Admin</NavLink>
                            : ""}
                        </li>
                        <li className={`${styles.liMargin}`}>
                            <NavLink className={styles.link} activeClassName={styles.alink} exact to="/cart" >Carrito</NavLink>
                        </li>
                        <div>
                        </div>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
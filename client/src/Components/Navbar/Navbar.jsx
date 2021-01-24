import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function NavBar() {
    return (
        <header id="header" class="fixed-top">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="d-flex align-items-center">
                        <h1 ><a href="index.html">byPlantas</a></h1>
                        <nav >
                            <ul>
                                <li class="active">
                                <NavLink exact to="/" >Inicio</NavLink>
                                </li>
                                <li>
                                <NavLink exact to="/catalogo" >Catálogo</NavLink>
                                </li>
                                <li>
                                <NavLink exact to="/categorias" >Categorias</NavLink>
                                </li>
                                <li>
                                <NavLink exact to="/login" >Login</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}
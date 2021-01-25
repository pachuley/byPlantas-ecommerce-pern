import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.module.css'
export default function NavBar() {
    return (
        <header id="header" class="fixed-top">
            <nav class="navbar navbar-expand-lg" >
                <h1 class="navbar-brand"><a href="index.html">byPlantas</a></h1>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav ml-auto">
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
                </div>
            </nav>
        </header>
    )
}
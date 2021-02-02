import React, {Fragment} from 'react';
import styles from './home.module.css'
import {Link} from 'react-router-dom'
import foto1 from './Images/Carrusel/foto1.png'
import foto2 from './Images/Carrusel/foto2.png'
import foto3 from './Images/Carrusel/foto3.png'

const Home = () => {
    return ( 
        <Fragment>
            <div className={`${styles.home}`}>
                <section>
                    <div className={`${styles.jumbotron}`}>
                        <div className={`container d-flex flex-column w-25 ml-auto ${styles.jumbotronText}`}>
                            <h2 className={`display-4 ${styles.jumbotronh2}`}>Bienvenido!</h2>
                            <p>Tu tienda para productos ecofriendly y sustentables!</p>
                            <div className="row">
                                <div className="col-3">
                                    <Link to="/products" className={`btn btnByPlantas`}>
                                        Nuestros Productos!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className={`d-flex flex-column ${styles.filosofia}`}>
                        <h1 className={`${styles.titles}`}>Nuestra filosofia</h1>
                        <p className={`${styles.filosofiaP}`}>Vender productos producidos de manera sustentable bajo la ideología de cuidar el medioambiente sin dejar de lado la calidad que el público espera de las mejores marcas!</p>
                    </div>
                </section>
                <section>

                    <div id="carruselOfertas" class="carousel slide" data-bs-ride="carousel">
                        <h1 className={`${styles.titles}`}>Ofertas</h1>
                        <div className="carousel-inner">
                            <div className={`carousel-item active`}>  
                                <img src={foto1} class="d-block w-85"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </div>
                            </div>
                            <div className={`carousel-item`}>
                                <img src={foto2} class="d-block w-85"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </div>
                            </div>
                            <div className={`carousel-item`}>
                                <img src={foto3} class="d-block w-85"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" data-target="carruselOfertas" role="button" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Anterior</span>
                        </a>
                        <a className="carousel-control-next" data-target="carruselOfertas" role="button" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Posterior</span>
                        </a>
                    </div>
                </section>
                <section>
                    <div className={`${styles.contacts}`}>
                        <form>
                            <h1 className={`${styles.titles}`}>Contáctanos!</h1>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                                <div id="emailHelp" class="form-text">Nunca compartiremos tu email con otras personas</div>
                            </div>
                            <div class="mb-3">
                                <label for="contenido" class="form-label">Mensaje</label>
                                <textarea rows="5" class="form-control" id="exampleInputPassword1"></textarea>
                            </div>
                            <button type="submit" className={`btn btnByPlantas`}>Enviar</button>
                        </form>
                    </div>
                </section>
            </div>
        </Fragment>
     );
}
 
export default Home;

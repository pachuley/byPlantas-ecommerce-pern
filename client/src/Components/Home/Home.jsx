import React, {Fragment} from 'react';
import styles from './home.module.css'
import {Link} from 'react-router-dom'

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
                                    <Link to="/products" className="btn btn-secondary">
                                        Nuestros Productos!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className={`d-flex flex-column ${styles.filosofia}`}>
                        <h1 className={`${styles.filosofiah1}`}>Nuestra filosofia</h1>
                        <p className={`${styles.filosofiaP}`}>Vender productos producidos de manera sustentable bajo la ideología de cuidar el medioambiente sin dejar de lado la calidad que el público espera de las mejores marcas!</p>
                    </div>
                </section>
                <section>
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">  
                                <img src="..." class="d-block w-100" alt="..."></img>
                            </div>
                            <div class="carousel-item">
                                <img src="..." class="d-block w-100" alt="..."></img>
                            </div>
                            <div class="carousel-item">
                                <img src="..." class="d-block w-100" alt="..."></img>
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </a>
                    </div>
                </section>
                <section>
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1"></input>
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </section>
            </div>
        </Fragment>
     );
}
 
export default Home;

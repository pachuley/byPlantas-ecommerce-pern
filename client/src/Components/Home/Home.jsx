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
            </div>
        </Fragment>
     );
}
 
export default Home;

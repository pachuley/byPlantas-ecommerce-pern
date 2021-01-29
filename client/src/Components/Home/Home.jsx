import React, {Fragment} from 'react';
import style from './home.module.css'
import {Link} from 'react-router-dom'

const Home = () => {
    return ( 
        <Fragment>
            <div className={`${style.home}`}>
                <div className="d-flex flex-column text-white w-50 mx-auto pt-5">
                    <h1 className="display-4 py-5">byPlants</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis sequi eum, sapiente dolore, veritatis deleniti, voluptate eligendi quisquam soluta ad tempora in at nihil ut deserunt exercitationem? Iste, nobis asperiores.</p>
                    <div className="row">
                        <div className="col-3">
                            <Link to="/products" className="btn btn-secondary">
                                Ir a Catálogo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
     );
}
 
export default Home;

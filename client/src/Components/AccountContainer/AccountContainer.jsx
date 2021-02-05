import React from 'react';
import FormLogin from '../FormLogin/FormLogin';
import styles from './accountcontainer.module.css'
import {Link} from 'react-router-dom'

const AccountContainer = ({history, location}) => {
    
    return ( 
        <div className = {`container`}>
            <h2 className={`m-0 text-center p-5`}>Accede a tu cuenta o registrate como Nuevo Usuario!</h2>
            <div className = {`container container-md d-inline-flex justify-content-around p-0 m-auto`}>
                <FormLogin history={history} location={location}/>
            </div>
            <div>
                <hr className = {`col-3 ${styles.horizontalRule}`}></hr>
                <div className = {`${styles.buttonContainer}`}>
                    <Link to="/register" className={`btn btnByPlantas`}>
                        Nuevo Usuario
                    </Link>
                </div>
            </div>
        </div>
     );
}
 
export default AccountContainer;
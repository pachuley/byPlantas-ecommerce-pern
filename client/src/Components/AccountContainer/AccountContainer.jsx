import React from 'react';
import FormLogin from '../FormLogin/FormLogin';
import styles from './accountcontainer.module.css'
import {Link} from 'react-router-dom'
import GoogleCredentialsLogin from '../GoogleCredentials/GoogleCredentialsLogin'

const AccountContainer = ({history, location}) => {
    
    return ( 
        <div className = {`container mb-5`}>
            <h2 className={`m-0 text-center p-5`}>Accede a tu cuenta o registrate como Nuevo Usuario!</h2>
            <div className = {`container container-md d-inline-flex justify-content-around p-0 m-auto`}>
                <FormLogin history={history} location={location}/>
            </div>
            <h4 className={`${styles.titles} mb-4`}>O ingresa con tu usuario Google</h4>
            <div>
                <GoogleCredentialsLogin />
            </div>
            <h4 className={`${styles.titles} mt-4 mb-4`}>Y si no tienes un usuario siempre te puedes registrar y crear una cuenta nueva!</h4>
            <div>
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
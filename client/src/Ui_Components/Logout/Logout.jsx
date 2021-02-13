import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/actions/userActions';
import { useHistory } from "react-router"
import {Link} from 'react-router-dom'
import styles from './logout.module.css';
import GoogleCredentialsLogout from '../../Components/GoogleCredentials/GoogleCredentialsLogout'

const Logout = () => {
  const userLogin = useSelector(state => state.userLogin);

  return (
    <div className='dropdown'>
      <button
        className={styles.link} 
        activeClassName={styles.alink}
        type='button'
        id='dropdownMenuButton'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'>
        Hola {userLogin.userLogin.firstname}!
      </button>
      <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
        <button className='dropdown-item'>
          <Link to='/profile'>Mi Perfil</Link>
        </button>
        <button className='dropdown-item'>
          <GoogleCredentialsLogout />
        </button>
      </div>
    </div>
  );
};

export default Logout;

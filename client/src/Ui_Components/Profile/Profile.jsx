import React from 'react';
import { useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import styles from './profile.module.css'

const Profile = (props) => {
    const userLogin = useSelector(state => state.userLogin)
    let isAuth = userLogin.userLogin
    console.log(userLogin.userLogin)
    return ( 
        isAuth ?
        <div className={`${styles.profile}`}>
            <div className={`${styles.photocontainer}`}>
                <img 
                    src="https://image.flaticon.com/icons/png/512/16/16363.png" alt=""
                    className={`${styles.photo}`}
                />
            </div>
            <div className='d-flex'>
                <span>Name:</span>
                <span className="px-2">{userLogin.userLogin.firstname}</span>
            </div>
            <div className='d-flex'>
                <span>Apellido:</span>
                <span className="px-2">{userLogin.userLogin.lastname}</span>
            </div>
            <div className='d-flex'>
                <span>Email:</span>
                <span className="px-2">{userLogin.userLogin.email}</span>
            </div>
            <div className='d-flex'>
                <span>Rol:</span>
                <span className="px-2">{userLogin.userLogin.role}</span>
            </div>
            <div className='d-flex'>
                <span>Dirección:</span>
                <span className="px-2">{userLogin.userLogin.address}</span>
            </div>
        </div>
        :
        <Redirect to={{
            pathname: '/login',
            state: {
              message: 'Debes estar logueado.'
            }
          }}/>
     );
}
 
export default Profile;
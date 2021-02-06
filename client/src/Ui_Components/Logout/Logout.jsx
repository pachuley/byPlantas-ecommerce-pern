import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/actions/userActions';
import { useHistory } from "react-router"
/* import styles from './logout.module.css'; */

const Logout = () => {
  const userLogin = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const history = useHistory()
  const handleLogout = () => {
    dispatch(logout())
    history.push("/")
  }

  return (
    <div className='dropdown'>
      <button
        className='btn btn-secondary btn-sm dropdown-toggle'
        type='button'
        id='dropdownMenuButton'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'>
        {userLogin.userLogin.firstname}
      </button>
      <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
        <button className='dropdown-item' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;

import React from 'react';
import {connect} from 'react-redux'
import {logout} from '../../Redux/actions/userActions';
import styles from './logout.module.css'


const Logout = (props)=>(
    <div>
        <a className={`${styles.link }`} activeClassName={styles.alink}onClick={() => props.dispatch(logout())}>Logout</a>
    </div>
);

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Logout)
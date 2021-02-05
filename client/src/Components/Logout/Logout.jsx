import React from 'react';
import {connect} from 'react-redux'
import { logout } from '../../Redux/actions/userActions';

const Logout = (props)=>(
    <div>
        <p className='btn btn-danger' onClick={() => props.dispatch(logout())}>Logout</p>
    </div>
);

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Logout)
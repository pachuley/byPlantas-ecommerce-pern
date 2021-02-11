import React, { useEffect, useState } from "react";
import axios from "axios";
import {Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUsers} from '../../Redux/actions/fetchUsersActions'
const { REACT_APP_BACKEND_URL } = process.env;

export default function UsersTable() {

    let userLocalstorage = JSON.parse(localStorage.getItem('userInfo'))
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'token': userLocalstorage !== null ? userLocalstorage.token : null
        },
    };

    useEffect(()=>{
        dispatch(fetchUsers())
    }, [])

    const userLogin = useSelector(state => state.userLogin)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    let isAuth = userLogin.userLogin && userLogin.userLogin?.role === 'ADMIN_ROLE'

    

    return(
        isAuth ?
        <div className='container'>
            <div className="col-md-12 col-lg-12 panel-right row">
                <h2 className='m-0 text-center p-5'>Lista De Usuarios</h2>
                <table className="table table-hover table-dark thfontsize">
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Rol</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Editar</th>
                            <th scope='col'>Bannear</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.users.map((user,index)=>(
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.status ? 'Active' : 'InActive'}</td>
                                <td><button className='btn btn-light'>Edit</button></td>
                                <td><button className='btn btn-danger'>Ban</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        :
        <Redirect to={{
            pathname: '/login',
            state: {
              message: 'Debes estar logueado y ser ADMIN.'
            }
        }}/>
    )
}
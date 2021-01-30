import React from 'react';
import FormUser from '../FormUser/FormUser';
import FormLogin from '../FormLogin/FormLogin';

const AccountContainer = () => {
    
    return ( 
        <div className = {`container`}>
            <h2 className={`m-0 text-center p-5`}>Ingreso</h2>
            <div className = {`container container-md d-inline-flex justify-content-around p-0 m-auto`}>
                <FormUser />
                <FormLogin />
            </div>
        </div>
     );
}
 
export default AccountContainer;
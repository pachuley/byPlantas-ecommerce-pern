import React from 'react';
import FormUser from '../FormUser/FormUser';
import FormLogin from '../FormLogin/FormLogin';

const AccountContainer = ({history, location}) => {
    
    return ( 
        <div className = {`container`}>
            <h2 className={`m-0 text-center p-5`}>Crea una nueva cuenta o accede a tu cuenta existente!</h2>
            <div className = {`container container-md d-inline-flex justify-content-around p-0 m-auto`}>
                <FormUser />
                <FormLogin history={history} location={location}/>
            </div>
        </div>
     );
}
 
export default AccountContainer;
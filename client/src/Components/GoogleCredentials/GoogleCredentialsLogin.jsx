import React from 'react';
import {GoogleLogin} from 'react-google-login';
import axios from 'axios'
import {useHistory} from "react-router"

const {REACT_APP_BACKEND_URL} = process.env;
const clientId = '515747986042-aams7flhu6mhnr1boi3mnm0pdqlih0il.apps.googleusercontent.com'

function GoogleCredentialsLogin() {
    const history = useHistory()
    const onSuccess = (res) => {
        axios.post(`${REACT_APP_BACKEND_URL}/users/login/${res.profileObj.email}`)
        .then(resp=>{
            history.push("/");
        })
        .catch(e => console.log(e))
      }

    const onFailure = (res) => {
        console.log(res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}

export default GoogleCredentialsLogin;
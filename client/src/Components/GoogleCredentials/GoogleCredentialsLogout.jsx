import React from 'react';
import {GoogleLogout} from 'react-google-login';
import {useHistory} from "react-router"

const clientId = '515747986042-aams7flhu6mhnr1boi3mnm0pdqlih0il.apps.googleusercontent.com'

function GoogleCredentialsLogout() {
    const history = useHistory()
    const onSuccess = () => {
        history.push("/");
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default GoogleCredentialsLogout;
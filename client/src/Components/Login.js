import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

// auth0Client
import auth0Client from './Auth/Auth';

const Login = () => {
    // methods

    // return
    return (
        <div className='login d-flex justify-content-center'>
            <button onClick={() => auth0Client.signIn()} class="btn btn-secondary btn-login" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sign in
            </button>
        </div>
    );
}

export default withRouter(Login);
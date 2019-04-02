import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';

// auth0Client
import auth0Client from './Auth/Auth';

const NavBar = () => {
    // methods

    // return
    return (
        <div className='nav d-flex flex-row-reverse'>
            {auth0Client.isAuthenticated() ? 
                <div class="dropdown">
                    <button class="btn dropdown-toggle navbar" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {auth0Client.getProfile().name}
                    </button> 
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="/profile/todos"><NavLink to='/profile/todos'>To Dos</NavLink></a>
                        <a class="dropdown-item" href="/profile/stats"><NavLink to='/profile/stats'>Stats</NavLink></a>
                        <button onClick={auth0Client.signOut} class="dropdown-item hover">Logout</button>
                    </div>
                </div> :
                <button onClick={() => auth0Client.signIn()} class="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sign in
                </button>
            }
        </div>
    );
}

{/* <div>
    <h5>{auth0Client.getProfile().name}</h5>
    <button onClick={auth0Client.signOut}>Sign out</button>
</div> :  */}
    {/* nickname, name, picture, updated_at, iss, sub, aud, iat, exp, nonce */}

export default withRouter(NavBar);
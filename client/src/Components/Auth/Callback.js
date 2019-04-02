import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from './Auth';

class Callback extends Component {
    // state

    // methods
    async componentDidMount() {
        await auth0Client.handleAuthentication();

        this.props.setUser(auth0Client.profile.name, auth0Client.profile.nickname, auth0Client.getIdToken());

        this.props.history.replace('/profile/todos');
    }

    // render
    render() {
        return (
            <p>Loading Profile...</p>
        );
    }
}

export default withRouter(Callback);
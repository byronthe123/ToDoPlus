import React, {Component} from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';

// Components:
import NavBar from './NavBar';
import Index from './Index';
import Timer from './Timer';
import Profile from './Profile';
import NotFound from './NotFound';
import Stats from './Stats';

// Context Consumer
import {Consumer} from './Context';

// Auth
import Callback from './Auth/Callback';
import auth0Client from './Auth/Auth';

// Secured Route:
import SecuredRoute from './SecuredRoute';

class App extends Component {
    // state
    constructor(props) {
      super(props);
      this.state = {
        checkingSession: true,
      }
    }
    
    // methods
    async componentDidMount() {
        if(this.props.location.pathName === '/callback') {
          this.setState({
            checkingSession: false
          });
          return;
        }
    
        try {
          await auth0Client.silentAuth();
          this.props.setUser(auth0Client.profile.name, auth0Client.profile.nickname, auth0Client.getIdToken());
          this.forceUpdate();
        } catch (err) {
          if(err.error !== 'login_required') console.log(err.error);
        }
    
        this.setState({
          checkingSession: false
        });

        // if(auth0Client.profile) {
        //     this.props.setUser(auth0Client.profile.name, auth0Client.profile.nickname, auth0Client.getIdToken());
        // }
    }
    
    // return 
    render() {
        return (
            <Consumer>
                {({setUserName, setUser}) => (
                    <React.Fragment>
                        <Switch>
                            <Route exact path='/' render={() => <Index/>} />
                            <SecuredRoute path='/profile/todos' component={Profile} checkingSession={this.state.checkingSession}/>
                            <SecuredRoute path='/profile/stats' component={Stats} checkingSession={this.state.checkingSession}/>
                            <Route component={NotFound} />
                        </Switch>
                        <Route exact path='/callback' render={() => <Callback setUserName={setUserName} setUser={setUser}/>} />
                    </React.Fragment>
                )}
            </Consumer>
        );
    }

}

export default withRouter(App);
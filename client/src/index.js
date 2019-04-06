import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import {Provider, Consumer} from './Components/Context';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Provider>
            <Consumer>
                {({setUser}) => (
                    <App setUser={setUser}/>
                )}
            </Consumer>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();

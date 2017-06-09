import React from 'react';
import {Route, Switch} from 'react-router-dom';

const io = require('socket.io-client');
export const socket = io();

import SignIn from './SignIn';
import MapView from './MapView'
import ChatView from './ChatView';

const Main = (props) => {
    return (
        <div>
            <div className="row">
                <div className="column small-12 medium-12 large-12">
                    <Switch>
                        <Route exact path="/" component={SignIn}/>
                        <Route path="/mapview/:id" component={MapView}/>
                        <Route path="/chatview/:id" component={ChatView}/>
                    </Switch>
                </div>
            </div>
        </div>

    );
};

export default Main;
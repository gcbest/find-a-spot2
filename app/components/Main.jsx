import React from 'react';
import {Route, Switch} from 'react-router-dom';

import SignIn from './SignIn';
import MapView from './MapView'
import ChatView from './ChatView';


const Main = (props) => {
    return (
        <div>
            <div className="row">
                <div className="column medium-6 large-4 small-centered">
                    {/*{props.children}*/}
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
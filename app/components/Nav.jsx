import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Nav = (props) => {
    return(
        <div className="top-bar">
            <div className="top-bar-left">
                <ul className="menu">
                    <li className="active"><a id="nav-title" href={window.location.origin}>Find-A-Spot</a></li>
                    <li className="active"><Link to={`/chatview/${props.user.room}`}>Chat</Link></li>
                    <li className="active"><Link to={`/mapview/${props.user.room}`}>Map</Link></li>
                </ul>
            </div>
            <div className="top-bar-right">
                <div className="menu">
                    <ul className="menu">
                        <li className="menu-text active">
                            Room: {props.user.room}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default connect((state) => {
    return state;
})(Nav);


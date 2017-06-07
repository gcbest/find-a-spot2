import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Nav = (props) => {
    return(
        <div className="top-bar">
            <div className="top-bar-left">
                <ul className="menu">
                    <li className="menu-text active">Find-A-Spot</li>
                    <li className="active"><Link to={`/chatview/${props.user.room}`}>Chat</Link></li>
                    <li className="active"><Link to={`/mapview/${props.user.room}`}>Map</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default connect((state) => {
    return state;
})(Nav);



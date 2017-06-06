import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Nav = (props) => (
    <div>
        <ul>
            <li><Link to={`/chatview/${props.user.room}`}>Chat</Link></li>
            <li><Link to={`/mapview/${props.user.room}`}>Map</Link></li>
        </ul>
    </div>
);

export default connect((state) => {
    return state;
})(Nav);

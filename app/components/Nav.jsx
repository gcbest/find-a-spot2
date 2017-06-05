import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => (
    <div>
        <ul>
            <li><Link to="/chatview">Chat</Link></li>
            <li><Link to="/mapview">Map</Link></li>
        </ul>
    </div>
);

export default Nav;

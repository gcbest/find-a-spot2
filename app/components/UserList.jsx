import React from 'react';

const UserList = (props) => {
    return (
        <div>
            <ul>
                {props.users.map((user, i) => {
                    return <li key={i}>{user}</li>;
                })}
            </ul>
        </div>
    );
};

export default UserList;
import React from 'react';
import {useAuth} from "../Contexts/AuthContext";

export const HomePage = () => {

    const {loggedUserInfo, isUserLogin} = useAuth();

    return (
        <div>
            <h1>Working on Homepage</h1>
            {isUserLogin && <h1>Welcome {loggedUserInfo.name} </h1>}
        </div>
    )
}


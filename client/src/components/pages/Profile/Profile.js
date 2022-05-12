import React from 'react';
import Auth from '../../../hoc/auth';

function Profile() {
    return (
        <>
            <h1>Profile</h1>
        </>
    )
}

export default Auth(Profile, true); 
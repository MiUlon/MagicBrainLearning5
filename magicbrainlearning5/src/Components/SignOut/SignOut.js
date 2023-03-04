import React from 'react';
import './SignOut.css';

const SignOut = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <div className='signOutToEnd'>
                <p onClick={() => onRouteChange('signout')} className='f3 link black pa3 pointer signOutDesign signOutBackground grow'>Sign out!</p>
            </div>
        )
    } else {
        return (
            <div className='signOutToEnd'>
                <p onClick={() => onRouteChange('signin')} className='f3 link black pa3 pointer signOutDesign signOutBackground grow'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 link black pa3 pointer signOutDesign signOutBackground grow'>Register</p>
            </div>
        )
    }
}

export default SignOut;
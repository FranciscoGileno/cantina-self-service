import React from 'react';
import './user-info.css';

const UserInfo = (props, {user, signOut}) => {
  const { photoURL, displayName } = user;
  const logOut = (event) => {
    event.preventDefault();
    signOut();
  }
  return (
    <div className="user-info">
      <img id="user-info" className="user-info__photo" src={photoURL} alt={name} style={{display: 'block'}} />
      <ul style={{padding: '16px', width: '300px'}} className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
          htmlFor="user-info">
        <li className="user-info__menu-item">
          <img style={{marginRight: '16px', width: '56px', height: '56px'}} className="user-info__photo" src={photoURL} alt={name} />
          <div className="user-info__content">
            {displayName}
            <a className="mdl-button mdl-button--colored" onClick={logOut}>Sign out</a>
          </div>
        </li>
      </ul>
    </div>
  );
}

UserInfo.contextTypes = {
  auth: React.PropTypes.object,
  signOut: React.PropTypes.func,
  user: React.PropTypes.object,
};

export default UserInfo;

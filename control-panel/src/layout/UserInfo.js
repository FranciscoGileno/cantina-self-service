import React from 'react';
import { Button, Menu } from 'react-mdl';
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
      <Menu align="right" valign="bottom" ripple target="user-info">
        <li className="user-info__menu-item" style={{padding: '16px'}}>
          <img style={{marginRight: '16px', width: '56px', height: '56px'}} className="user-info__photo" src={photoURL} alt={name} />
          <div className="user-info__content">
            <span style={{whiteSpace: 'nowrap'}}>{displayName}</span>
            <Button colored onClick={logOut}>Sign out</Button>
          </div>
        </li>
      </Menu>
    </div>
  );
}

UserInfo.contextTypes = {
  auth: React.PropTypes.object,
  signOut: React.PropTypes.func,
  user: React.PropTypes.object,
};

export default UserInfo;

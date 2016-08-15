import React from 'react';
import './user-info.css';

const UserInfo = ({ name, photoUrl, onSignout }) => (
  <div className="user-info">
    <img id="user-info" className="user-info__photo" src={photoUrl} alt={name} style={{display: 'block'}} />
    <ul style={{padding: '16px', width: '300px'}} className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
        htmlFor="user-info">
      <li className="user-info__menu-item">
        <img style={{marginRight: '16px', width: '56px', height: '56px'}} className="user-info__photo" src={photoUrl} alt={name} />
        <div className="user-info__content">
          {name}
          <a href="" className="mdl-button mdl-button--colored" onClick={onSignout}>Sign out</a>
        </div>
      </li>
    </ul>
  </div>
);

export default UserInfo;

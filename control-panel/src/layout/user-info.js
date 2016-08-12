import React from 'react';
import './user-info.css';

const UserInfo = ({ name, photoUrl }) => (
  <div className="user-info">
    <img className="user-info__photo" src={photoUrl} alt={name} />
  </div>
);

export default UserInfo;

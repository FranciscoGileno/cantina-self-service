import React from 'react';
import UserInfo from './UserInfo';

const Header = () => (
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Cantina Self Service - BRUM</span>
      <div className="mdl-layout-spacer"></div>
      <nav className="mdl-navigation">
        <UserInfo />
      </nav>
    </div>
  </header>
);

export default Header;

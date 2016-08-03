import React from 'react';
import UserInfo from './user-info.js';

const Layout = ({ children, onSignout, user }) => (
  <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">Cantina Self Service - Control Panel</span>
        <div className="mdl-layout-spacer"></div>
        {user ? (
          <nav className="mdl-navigation mdl-layout--large-screen-only">
            <a className="mdl-navigation__link" href="" onClick={onSignout()}>
              <UserInfo name={user.displayName} photoUrl={user.photoURL} />
              Logout
            </a>
          </nav>
        ) : ''}
      </div>
    </header>
    <div className="mdl-layout__drawer">
      <span className="mdl-layout-title">Title</span>
      <nav className="mdl-navigation">
        <a className="mdl-navigation__link" href="">Link</a>
        <a className="mdl-navigation__link" href="">Link</a>
        <a className="mdl-navigation__link" href="">Link</a>
        <a className="mdl-navigation__link" href="">Link</a>
      </nav>
    </div>
    <main className="mdl-layout__content">
      <div className="mdl-grid">
        {children}
      </div>
    </main>
  </div>
);

export default Layout;

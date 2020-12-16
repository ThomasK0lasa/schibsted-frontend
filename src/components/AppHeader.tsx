import React from 'react';
import Logo from './Logo';
import './AppHeader.css';

function Header() {
  return (
    <header className="app-header">
      <Logo />
      <div className="app-name">
        <h1>
          News Previews
          </h1>
        <p>Demo App for Schibsted</p>
      </div>
    </header>
  );
}

export default Header;
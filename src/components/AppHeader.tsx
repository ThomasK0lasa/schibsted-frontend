import Logo from './Logo';
import './AppHeader.css';

function Header () {
  return (
    <header className="appHeader">
      <Logo />
      <div className="appName">
        <h1>
          News Previews
        </h1>
        <p>Recruitment App for Schibsted</p>
      </div>
    </header>
  )
}

export default Header;
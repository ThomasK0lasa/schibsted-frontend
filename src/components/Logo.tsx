import logo from '../assets/gfx/np-logo.svg';
import './Logo.css';

function Logo() {
  return (
    <div className="app-logo">
      <img src={logo} className="app-logo-img" alt="logo" />
    </div>
  );
}

export default Logo;
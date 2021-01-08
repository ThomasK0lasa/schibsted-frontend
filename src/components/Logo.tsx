import logo from '../assets/gfx/np-logo.svg';
import './Logo.css';

function Logo() {
  return (
    <div className="appLogo">
      <img src={logo} className="appLogoImg" alt="logo" />
    </div>
  );
}

export default Logo;
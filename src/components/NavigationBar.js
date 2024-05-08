import KuvaLogo from "../media/KuvaLogo.png";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  return (
    <div className="nav-container">
      <div className="nav-bg">
        <Link to="/home"><img alt="logo" className="nav-logo" src={KuvaLogo} /></Link>
        <Link to="/home" className="nav-link"><div className="header-name">Home</div></Link>
        <Link to="/image-viewer" className="nav-link"><div className="header-name">Image Viewer</div></Link>
        <Link to="/image-gallery" className="nav-link"><div className="header-name">Image Gallery</div></Link>
        <Link to="/camera-info" className="nav-link"><div className="header-name">Camera Info</div></Link>
      </div>
    </div>
  );
}

export default NavigationBar;

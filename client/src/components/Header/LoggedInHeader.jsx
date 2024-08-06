import "./Header.css";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const LoggedInHeader = () => {
  const logout = () => {
    Auth.logout();
  };
  return (
    <header className="home-header">
      <nav>
        <ul className="header-ul">
          <li>
            <Link className="button" to="/">
              Home
            </Link>
          </li>
          <li>
            <button className="button" onClick={logout}>
              Logout
            </button>
          </li>

          <li>
            <Link className="button" to="/myArt">
              Your Posts
            </Link>
          </li>

          <li>
            <Link className="button" to="/myAccount">
              Your Account
            </Link>
          </li>
          <li>
            <Link className="button" to="/Cart">
              Cart
            </Link>
          </li>
          <li>
            <h1 className="header-h1">ART OF WEAR</h1>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default LoggedInHeader;

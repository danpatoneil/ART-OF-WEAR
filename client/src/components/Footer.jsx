import './Footer.css';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <li>
        <Link className="new-post-button" to="/Upload">New Post</Link>
      </li>
    </footer>
  );
}

export default Footer;

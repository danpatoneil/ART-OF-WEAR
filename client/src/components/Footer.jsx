import './Footer.css';
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
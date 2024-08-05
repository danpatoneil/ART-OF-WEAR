import './Header.css';
import { Link } from "react-router-dom";

function Header(){
    return (
        <header className = "home-header">
                <h1 className ="header-h1">ART OF WEAR </h1>
            <nav>   
                <ul className = "header-ul">
                <li>
                        <Link className="button" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="button" to="/Login">Login</Link>
                    </li>
                    <li>
                        <Link className="button" to="/Register">Sign up</Link>
                    </li>
                    <li>
                        <Link className="button" to="/Cart">Cart</Link>
                    </li>
               </ul>
            </nav>
        </header>
    );
}

export default Header;

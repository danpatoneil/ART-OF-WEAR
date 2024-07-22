// import './Header.Home.css';
function Header(){
    return (
        <header className = "home-header">
            <nav>
                <ul className = "header-ul">
                    <button className = "button" href="/Home">Home</button>
                    <button className = "button" href="/Login">Login</button>
                    <button className = "button" href="/Sign up">Sign up</button>
               <h1 className = "header-h1">ART OF WEAR</h1>
               </ul>
            </nav>
        </header>
    );
}

export default Header;

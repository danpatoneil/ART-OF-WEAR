import './Headerhome.css';

const LoggedInHeader = () =>{
    return (
        <header className = "home-header">
            <nav>
                <ul className = "header-ul">
                    <button className = "button" href="/Cart">Cart</button>
                    <button className = "button" href="/Home">Home</button>
               <h1 className = "header-h1">ART OF WEAR</h1>
               </ul>
            </nav>
        </header>
    );
}

export default LoggedInHeader;

import './App.css';
import { Outlet } from "react-router-dom";
// import Header from "./components/Header.jsx"
// import Footer from "./components/Footer.jsx"
// import Home from "./pages/Home.jsx"


const App = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default App;

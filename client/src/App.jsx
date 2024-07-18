import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Post from "./components/Post.jsx"
import home from "./pages/Home.jsx"

const App = () => {
    return (
        <div>
            <h1>hello</h1>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;

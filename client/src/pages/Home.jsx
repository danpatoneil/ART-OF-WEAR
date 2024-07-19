import Post from "../components/Post";
import Headerhome from "../components/Headerhome";
import Footer from "../components/Footer";
import Gallery from "../components/Gallery"
const Home = () => {
    return (
        <>
            <Headerhome />
            <Post /> 
            <Gallery/>
            <Footer />
            </>
    );
}

export default Home;
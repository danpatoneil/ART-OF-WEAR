//needs to be connected to backend to display posts and user info
import './Post.css';

function Post(){
    return (
    <div className = 'grid-container'>
        <div className = 'post-card'>
            <h2 className = "card-title">Post Title</h2>
            <img className = "post-img" src="./assets/cat.png" alt='Art' ></img>
            <p className = 'card-text'>Post content...</p>
            <footer>
                <small>Author: John Doe</small>
            </footer>
            </div>
        </div>
    );
}

export default Post;
import art from './art.jpg'; //needs to be connected to backend

function Post(){
    return (
        <div className = 'card'>
            <h2 className = "card-title">Post Title</h2>
            <img className = "postimg" src="https://via.placeholder.com/150" alt='Art' ></img>
            <p className = 'card-text'>Post content...</p>
            <footer>
                <small>Author: John Doe</small>
            </footer>
        </div>
    );
}

export default Post;
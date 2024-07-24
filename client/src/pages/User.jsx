import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserArtPage = ({ match }) => {

  let { id } = useParams();
  const [userImages, setUserImages] = useState([]);
  const username = id;

  useEffect(() => {
    const fetchUserArt = async () => {
      const response = await fetch(`/api/getUserArt?username=${username}`);
      const data = await response.json();
      setUserImages(data.images);
    };

    fetchUserArt();
  }, [username]);

  let currentPage = 0;
  let totalImages = userImages.length;

  function createImageElement(url) {
    return <img src={url} alt="Gallery Image" />;
  }

  function appendImagesToContainer() {
    const startIndex = currentPage * 3;
    const endIndex = startIndex + 3;
    const imagesToAppend = userImages.slice(startIndex, endIndex);

    return imagesToAppend.map(createImageElement);
  }

  return (
    <div>
      <h1>{username}'s ART of WEAR Gallery</h1>
      <div className="gallery-container">
        {appendImagesToContainer()}
      </div>
      <style>
        {`
         .gallery-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
         .gallery-container img {
            width: calc(33.33% - 10px);
            margin: 10px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
      <script>
        {`
          const galleryContainer = document.querySelector('.gallery-container');
          galleryContainer.addEventListener('scroll', () => {
            const scrollPosition = galleryContainer.scrollTop + galleryContainer.offsetHeight;
            const scrollHeight = galleryContainer.scrollHeight;

            if (scrollPosition >= scrollHeight) {
              currentPage++;
              const newImages = appendImagesToContainer();
              galleryContainer.innerHTML += newImages;
            }
          });
        `}
      </script>
    </div>
  );
};

export default UserArtPage;

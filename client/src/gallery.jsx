// pages/gallery.jsx
import Head from 'next/head';

const imagesPerRow = 3;
const imagesPerPage = 9; // 3x3 grid

// assume you have an array of image URLs from the user gallery page
const imageUrls = [...]; // replace with actual image URLs

let currentPage = 0;
let totalImages = imageUrls.length;

function createImageElement(url) {
  return <img src={url} alt="Gallery Image" />;
}

function appendImagesToContainer() {
  const startIndex = currentPage * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const imagesToAppend = imageUrls.slice(startIndex, endIndex);

  return imagesToAppend.map(createImageElement);
}

const GalleryPage = () => {
  return (
    <div>
      <Head>
        <title>ART of WEAR Gallery</title>
      </Head>
      <div className="gallery-container">
        {appendImagesToContainer()}
      </div>
      <style jsx>
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

export default GalleryPage;
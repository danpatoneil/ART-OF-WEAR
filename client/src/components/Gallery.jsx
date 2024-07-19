import dummydata from "../utils/image-seeds";

console.log("Dummy data:", dummydata);

const GalleryPage = () => {
  return (
    <div>
      <div className="gallery-container">
        <h1>Gallery</h1>
        {dummydata.map((data) => {
          return (
            <div className="image-card">
              <img src={data.url} alt={data.alt} />
              <div className="image-id">
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'black' // Add this line to keep the text color black
                  }}
                  onClick={() => location.href=`user/${data.id}`}
                >
                  {data.alt}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
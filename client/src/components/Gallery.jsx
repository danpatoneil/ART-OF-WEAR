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
              <h5>{data.alt}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
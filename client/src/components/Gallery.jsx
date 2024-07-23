import dummydata from "../utils/image-seeds";

// import { GET_DESIGN_LIST } from "../utils/queries";
// import { useQuery } from "@apollo/client";

const GalleryPage = () => {
  return (
    <div>
      <div className="gallery-container">
        <h1>Gallery</h1>
        {dummydata.map((data) => {
          return (
            <div className="image-card" key={data.id}>
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

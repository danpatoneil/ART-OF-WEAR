import dummydata from "../utils/image-seeds";
import "./Gallery.css";
// import { GET_DESIGN_LIST } from "../utils/queries";
// import { useQuery } from "@apollo/client";

const GalleryPage = () => {
  return (
    <div>
      <div className="gallery-container">
        {dummydata.map((data) => {
          return (
            <div className="gallery-card" key={data.id}>
              <img src={data.url} alt={data.alt} />
              <div className="image-id">
                <button className = "gallery-button"
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

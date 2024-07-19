import dummydata from "../utils/image-seeds.json"
console.log(dummydata)
const GalleryPage = () => {
  return (
    <div>
       <div className="gallery-container">
         <h1>Gallery</h1>
        <div> 
          {dummydata?.map((data)=> {
          return(
            <div>
            <img src={data.url} alt="imagecard" />
            <h5>{data.alt}</h5>
            </div>
          )
        })}
        </div>
        
      </div>
    </div>
  );
};

export default GalleryPage;
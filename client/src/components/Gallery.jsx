// import dummydata from "../utils/image-seeds";

// // import { GET_DESIGN_LIST } from "../utils/queries";
// // import { useQuery } from "@apollo/client";

// console.log("Dummy data:", dummydata);

// const GalleryPage = () => {
//   return (
//     <div>
//       <div className="gallery-container">
//         <h1>Gallery</h1>
//         {dummydata.map((data) => {
//           return (
//             <div className="image-card" key={data.id}>
//               <img src={data.url} alt={data.alt} />
//               <div className="image-id">
//                 <button
//                   style={{
//                     backgroundColor: 'transparent',
//                     border: 'none',
//                     padding: 0,
//                     cursor: 'pointer',
//                     color: 'black' // Add this line to keep the text color black
//                   }}
//                   onClick={() => location.href=`user/${data.id}`}
//                 >
//                   {data.alt}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default GalleryPage;


import { useQuery, gql } from "@apollo/client";
import { GET_DESIGN_LIST } from "../utils/queries";
import { useNavigate } from "react-router-dom";

const GalleryPage = () => {
  const { data, error, loading } = useQuery(GET_DESIGN_LIST);
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const designs = data?.getDesigns;
  const handleBack = () => {
    navigate(-1);
  };

  const handleForward = () => {
    navigate(1);
  };

  return (
    <div>
      <div className="gallery-container">
        <h1>Gallery</h1>
        {designs?.map((design) => {
          return (
            <div className="image-card" key={design._id}>
              <img src={design.image} alt={design._id} />
              <div className="image-id">
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'black'
                  }}
                  onClick={() => navigate(`user/${design._id}`)}
                >
                  {design._id}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="navigation">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleForward}>Forward</button>
      </div>
    </div>
  );
};

export default GalleryPage;
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_DESIGNS_OF_USER } from "../../utils/queries";
import './User.css';
const UserArtPage = () => {
  let { id } = useParams();
  const { loading, data, error } = useQuery(GET_DESIGNS_OF_USER, {
    variables: { id },
  });

  const toShirtPage = e =>{
    const index = e.target.getAttribute("data-index");
    window.location.assign(`/Shirts/${index}`)
  }
  if(error)console.error(error)
  if(data) console.log(data.getUser.designs)

  return (
    <div>
        {error? <p>Something has gone wrong</p> : (
            <div>
                {loading ? (
    <p>loading...</p>
  ) : (
    <div>
        {data.getUser.designs.length ? (

    <div>
    <h1>{data.getUser.username}&#39;s Art of Wear Gallery</h1>
    {data.getUser.designs.map((design) => (
    <img src={design.image} data-index={design._id} key={design._id} onClick={toShirtPage} />
))}
  </div>
        ) : <p>Looks like {data.getUser.username} doesn&#39;t have any designs available right now</p>}
    </div>
  )}
            </div>
        )}
    </div>
  );
};

export default UserArtPage;






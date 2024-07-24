import { useQuery, useMutation } from "@apollo/client";
import './NativeProfile.css';
import { GET_USER_DESIGNS } from "../../utils/queries";
import { HIDE_DESIGN } from "../../utils/mutations";

const NativeProfile = () => {
  // Define the GraphQL query to get user posts
  const { loading, error, data } = useQuery(GET_USER_DESIGNS);

  const [hideDesign] = useMutation(HIDE_DESIGN, {
    update(cache, { data: { hideDesign } }) {
      // Read the existing designs from the cache
      const existingDesigns = cache.readQuery({ query: GET_USER_DESIGNS });

      // Update the cache by removing the deleted design
      cache.writeQuery({
        query: GET_USER_DESIGNS,
        data: {
          me: {
            ...existingDesigns.me,
            designs: existingDesigns.me.designs.filter(design => design._id !== hideDesign._id)
          }
        }
      });
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  let designs;
  if(data.me.designs) designs = data.me.designs;

  const handleDelete = async (e) => {
    const index = e.target.getAttribute("data-index");
    const {data} = await hideDesign({variables: {id:index}})
    console.log(data)
  };
  console.log("this is data: ", data.me.designs);

  return (
    <div>
        <h1>{data.me.username}'s Page</h1>
    <div className="gallery-container">
        {designs ? (
          designs.map((design) => (
            <li className="image-card" key={design._id}>
              <img src={design.image} />
              <button data-index={design._id} onClick={handleDelete}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>Looks like you don't have any designs. Why not make a post?</p>
        )}
    </div>
    </div>
  );
};

export default NativeProfile;



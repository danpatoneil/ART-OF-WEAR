import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_ME } from "../../utils/queries";
import { UPDATE_USER, UPDATE_BANKING_INFO } from "../../utils/mutations";
import "./NA.css";

const NativeAccount = () => {
  // Define the GraphQL query to get user posts
  const { loading, error, data } = useQuery(GET_ME);
  const [formData, setFormData] = useState({ username: "", email: "" });
  //   const [updateUser] = useMutation(UPDATE_USER, {
  //     // update(cache, { data: { hideDesign } }) {
  //     //   // Read the existing designs from the cache
  //     //   const existingDesigns = cache.readQuery({ query: GET_USER_DESIGNS });

  //     //   // Update the cache by removing the deleted design
  //     //   cache.writeQuery({
  //     //     query: GET_USER_DESIGNS,
  //     //     data: {
  //     //       me: {
  //     //         ...existingDesigns.me,
  //     //         designs: existingDesigns.me.designs.filter(
  //     //           (design) => design._id !== hideDesign._id
  //     //         ),
  //     //       },
  //     //     },
  //     //   });
  //     // },
  //     update(cache, {data: {updateUser}}) {

  //     }
  //   });

  //   const [updateBanking] = useMutation(UPDATE_BANKING_INFO, {

  //   });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  let me;
  if (data.me) {
    me = data.me;
  }

  //   const handleDelete = async (e) => {
  //     const index = e.target.getAttribute("data-index");
  //     const { data } = await hideDesign({ variables: { id: index } });
  //     console.log(data);
  //   };
  const updateUser = async (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const handleUpdate = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const updatePassword = async () => {
    console.log("updatePassword");
  };
  const updateBanking = async () => {
    console.log("updateBanking");
  };
//   console.log("this is me: ", me);

  return (
    <div>
      <h1>{me.username}&#39;s Account</h1>
      <form onSubmit={updateUser}>
        <label htmlFor="usernameInput">Username: </label>
        <br />
        <input
          type="text"
          name="username"
          placeholder={me.username}
          onChange={handleUpdate}
        />
        <br />
        <label htmlFor="emailInput">email: </label>
        <br />
        <input
          type="email"
          name="email"
          id="emailInput"
          placeholder={me.email}
          onChange={handleUpdate}
        />
        <br />
        <button>Update username and email</button>
      </form>
      <button onClick={updatePassword}>Update Password</button>
      <br />
      <button onClick={updateBanking}>Update Banking Info</button>
    </div>
  );
};

export default NativeAccount;

// {designs ? (
//     designs.map((design) => (
//       <li className="image-card" key={design._id}>
//         <img src={design.image} />
//         <button data-index={design._id} onClick={handleDelete}>
//           Delete
//         </button>
//       </li>
//     ))
//   ) : (
//     <p>Looks like you don&#39;t have any designs. Why not make a post?</p>
//   )}

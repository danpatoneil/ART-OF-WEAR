import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ME } from "../../utils/queries";
import {
  UPDATE_USER,
  UPDATE_BANKING_INFO,
  UPDATE_PASSWORD,
} from "../../utils/mutations";
import "./NA.css";
import Popup from "reactjs-popup";

const NativeAccount = () => {
  // Define the GraphQL query to get user posts
  const { loading, error, data } = useQuery(GET_ME);
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [pwFormData, setPwFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    error: ''
  });
  useEffect(() => {
    if (!loading)
      setFormData({ username: data.me.username, email: data.me.email });
  }, [data, loading]);
  const [updateUser] = useMutation(UPDATE_USER);
  const [updateBanking] = useMutation(UPDATE_BANKING_INFO);
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  let me;
  if (data.me) {
    me = data.me;
  }
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const data = await updateUser({ variables: formData });
    if (data) window.location.assign("/myAccount");
  };
  const handleUserUpdate = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePWUpdate = async (e) => {
    setPwFormData({ ...pwFormData, [e.target.name]: e.target.value, error: '' });
  };
  const handleBankingUpdate = async (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    console.log(pwFormData);
    if (pwFormData.newPassword == pwFormData.confirmPassword) {
      console.log("passwords match");
      console.log(pwFormData)
    } else {
        console.log('passwords do not match')
        setPwFormData({ ...pwFormData, error: 'Your new passwords do not match, one of them might be entered incorrectly'})
    };
    // await updatePassword({variables: formData})
  };
  const handleBankingSubmit = async (e) => {
    e.preventDefault();
    // await updateUser({variables: formData})
  };

  return (
    <div>
      <h1>{me.username}&#39;s Account</h1>
      <div className="center">
        <form onSubmit={handleUserSubmit}>
          <label htmlFor="usernameInput">Username</label>
          <br />
          <input
            type="text"
            name="username"
            placeholder={me.username}
            onChange={handleUserUpdate}
          />
          <br />
          <br />
          <label htmlFor="emailInput">email</label>
          <br />
          <input
            type="email"
            name="email"
            id="emailInput"
            placeholder={me.email}
            onChange={handleUserUpdate}
          />
          <br />
          <br />
          <button>Update username and email</button>
        </form>

        <Popup
          trigger={
            <button onClick={handlePasswordSubmit}>Update Password</button>
          }
          position="top"
        >
          <div className="popup">
            <div className="center">
            <form onSubmit={handlePasswordSubmit}>
              <table>
                <tr>
                  <td>
                    <label htmlFor="currentPassword">
                      Enter your current password{" "}
                    </label>
                  </td>
                  <td>
                    <input
                      type="password"
                      name="currentPassword"
                      onChange={handlePWUpdate}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="newPassword">
                      Enter your new password{" "}
                    </label>
                  </td>
                  <td>
                    <input
                      type="password"
                      name="newPassword"
                      onChange={handlePWUpdate}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="confirmPassword">
                      Confirm your new password{" "}
                    </label>
                  </td>
                  <td>
                    <input
                      type="password"
                      name="confirmPassword"
                      onChange={handlePWUpdate}
                    />
                  </td>
                </tr>
              </table>
                <div className="center">
                    <button>Submit Password Update</button>
                </div>
                {pwFormData.error}
            </form>
            </div>
          </div>
        </Popup>
        <form>
          <button onClick={handleBankingSubmit}>Update Banking Info</button>
        </form>
      </div>
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

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Protected = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.get('/api/protected', config);
          setData(data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return <p>You need to be logged in to view this page</p>;
  }

  return (
    <div>
      <h1>Protected Route</h1>
      {data ? (
        <div>
          <p>{data.message}</p>
          <p>Welcome, {data.user.username}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Protected;
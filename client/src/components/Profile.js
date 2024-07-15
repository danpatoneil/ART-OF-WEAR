import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (user) {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get('/api/products/user', config);
        setProducts(data);
      }
    };

    fetchUserProducts();
  }, [user]);

  return (
    <div>
      <h1>{user?.username}'s Profile</h1>
      <h2>Your Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>{product.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
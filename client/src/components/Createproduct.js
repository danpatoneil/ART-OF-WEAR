import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const CreateProduct = () => {
  const [formData, setFormData] = useState({ title: '', description: '', price: '', category: '' });
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post('/api/products', formData, config);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" onChange={handleChange} placeholder="Title" />
      <textarea name="description" onChange={handleChange} placeholder="Description"></textarea>
      <input type="number" name="price" onChange={handleChange} placeholder="Price" />
      <input type="text" name="category" onChange={handleChange} placeholder="Category" />
      <button type="submit">Create Product</button>
    </form>
  );
};

export default CreateProduct;
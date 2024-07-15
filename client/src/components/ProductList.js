import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>{product.title}</Link>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>{product.category}</p>
            <p>Seller: {product.user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

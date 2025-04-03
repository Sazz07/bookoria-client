import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();

  return (
    <div>
      <h1>Product Details Page</h1>
      <p>Product ID: {productId}</p>
      <div>Product Information Component (Placeholder)</div>
      <div>Buy Now Button (Placeholder)</div>
      <div>Reviews Section (Placeholder)</div>
    </div>
  );
};

export default ProductDetails;

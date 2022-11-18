import { useState, useEffect } from 'react';
import axios from 'axios';

function Product(props) {
  const {product, updateCart, setError} = props
  
  const addToCart = async(productID) => {
    try {
      await axios.post("/api/cart/" + productID);
      updateCart();
    } catch(error) {
      setError("Error adding product to cart.");
    }
  };
  
  return (
    <div className="Product">
      <p>
      {product.name}, {product.price}   
      <button onClick={e => addToCart(product.id)}>Add to Cart</button>
      </p>
    </div>
  );
}

export default Product;
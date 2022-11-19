import { useState } from 'react';
import axios from 'axios';

function Item(props) {
  const [product, setProduct] = useState("");
  const {item, updateCart} = props
  const [error, setError] = useState("");
  
  const decreaseQuantity = async(item) => {
    try {
      var newQuantity = item.quantity - 1;
      await axios.put("/api/cart/" + item.id + "/" + newQuantity);
      updateCart();
    } catch(error) {
      setError("Error updating quantity.");
    }
  }
  
  const increaseQuantity = async(item) => {
    try {
      var newQuantity = item.quantity + 1;
      await axios.put("/api/cart/" + item.id + "/" + newQuantity);
      updateCart();
    } catch(error) {
      setError("Error updating quantity.");
    }
  }
  
  const deleteItem = async(item) => {
    try {
      await axios.delete("/api/cart/" + item.id);
      updateCart();
    } catch(error) {
      setError("Error deleting item from cart.");
    }
  };
  
  const getProduct = async(item) => {
    try {
      const response = await axios.get("/api/products/" + item.id);
      setProduct(response.data);
      console.log(product);
    } catch(error) {
      setError("Error getting a product.");
    }
  }
  
  getProduct(item);
  
  
  return (
    <div className="Item">
    {error}
      <p>
        Product: {product.name} <br/> Quantity: {item.quantity} <br/>
        <button onClick={e => decreaseQuantity(item)}>-</button>
        <button onClick={e => increaseQuantity(item)}>+</button>
        <br/>
        <button onClick={e => deleteItem(item)}>Remove from Cart</button>
      </p>
    </div>
  );
}

export default Item;
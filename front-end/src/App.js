import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from "./Product.js"
import Cart from "./Cart.js"
import './App.css';

function App() {
  // setup state
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  var update = false;

  const fetchProducts = async() => {
    try {      
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch(error) {
      setError("error retrieving products: " + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchProducts();
  },[]);

  const fetchCart = async() => {
    try {      
      const response = await axios.get("/api/cart");
      setCart(response.data);
    } catch(error) {
      setError("error retrieving cart: " + error);
    }
  }
  
  const updateCart = async() => {
    update = true;
    fetchCart();
  }
  
  useEffect(() => {
    fetchCart();
  },[update]);
  
  // render results
  return (
    <div className="App">
      {error}
      <h1>Products</h1>
      {products.map( product => (
        <div key={product.id} className="product">
            <Product key={product.id} product={product} updateCart={updateCart} setError={setError}/>
        </div>
      ))} 
      <h1>Cart</h1>
      <Cart items={cart} updateCart={updateCart}/> 
    </div>
  );
}

export default App;

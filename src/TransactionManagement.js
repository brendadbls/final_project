import React, { useState } from 'react';
import ProdManagement from './ProductManagement';

const TransManagement = () => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [prodName, setProdName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [products, setProducts,] = useState([
    { id: 1, name: 'Mens T-shirt', price: 100.99, stock: 10, image: 'path/to/tshirt-image.jpg' },
    { id: 2, name: 'Unisex Plain Jogger Pants', price: 200, stock: 10, image: 'path/to/pants-image.jpg' },
    { id: 3, name: 'Shoes', price: 1500, stock: 10, image: 'path/to/shoes-image.jpg' },
    { id: 4, name: 'Bags', price: 1900, stock: 10, image: 'path/to/bags-image.jpg' },
  ]);



  const addToCart = (product) => {
    if (product.stock > 0) {
      const existingItemIndex = cart.findIndex((item) => item.id === product.id);
      if (existingItemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
      setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p))
    );
      setMessage('Thank you for your purchase!');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } else {
      setMessage('Sorry, this product is out of stock.');
    }
  };

  const AddNewProduct = () => {
    if (!prodName || !price || !stock) {
      return;
    }
    const newProduct = {
      id: products.length + 1, // Increment the ID for the new product
      name: prodName,
      price: parseFloat(price),
      stock: parseInt(stock),
      image: 'path/to/default-image.jpg', // You can replace this with the actual path to the image
    };

    console.log('Adding new product:', newProduct);

    setProducts([...products, newProduct]);
    setProdName('');
    setPrice('');
    setStock('');
  };
  
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };
  
  const showBuyNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // Adjust the duration as needed (e.g., 3000 milliseconds = 3 seconds)
  };

  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: '1', marginRight: '20px' }}>
        <h2 style={{ fontSize: '30px', marginBottom: '10px' }}>Available Products:</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products.map((product) =>
            product.stock > 0 ? (
              <li key={product.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', fontSize: '25px' }}>
                <div style={{ marginRight: '25px' }}>
                  <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px', borderRadius: '10px' }} />
                </div>
                <div>
                  <span>
                    {product.name} - ₱{product.price.toFixed(2)} | Stock: {product.stock}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      backgroundColor: 'blue',
                      color: '#fff',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      marginLeft: '10px',
                      fontSize: '20px'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            ) : null
          )}
        </ul>
      </div>
      <h2 style={{ fontSize: '40px', marginRight: '70px', marginBottom: '200px' }}>Cart:</h2>
      <ul style={{ listStyle: 'none', padding: 0, fontSize: '25px' }}>
        {cart.map((cartItem) => (
          <li key={cartItem.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', height: '250px' }}>
            <div style={{ marginRight: '20px' }}>
              <img src={cartItem.image} alt={cartItem.name} style={{ width: '50px', height: '50px' }} />
            </div>
            <div>
            {cartItem.prodName} - ₱{cartItem.price.toFixed(2)} | Quantity:
              <button onClick={() => decreaseQuantity(cartItem.id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  marginRight: '5px',
                  margin: '5px',
                  fontSize: '20px'
                }}>-</button>
              <span style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '5px 10px',
                borderRadius: '3px',
                margin: '0 5px',
              }}>
                {cartItem.quantity}
              </span>
              <button onClick={() => increaseQuantity(cartItem.id)}
                style={{
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  marginLeft: '5px',
                  margin: '5px',
                  fontSize: '20px'
                }}>+</button>

              <button onClick={() => { showBuyNotification(); }}
                style={{ margin: '7px', borderRadius: '10px', fontSize: '20px' }}>
                Buy Now
              </button>
              <button onClick={() => removeFromCart(cartItem.id)}>
                Cancel
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Notification */}
      {showNotification && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'green',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            zIndex: '9999'
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default TransManagement;

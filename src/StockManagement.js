import React, { useState } from 'react';

const initialProducts = [
  { id: 1, name: 'Product A', stock: 5 },
  { id: 2, name: 'Product B', stock: 3 },
  { id: 3, name: 'Product C', stock: 1 },
  { id: 4, name: 'Product D', stock: 8 },
];

const StockManagement = () => {
  const [products, setProducts] = useState(initialProducts);
  const [updatedStocks, setUpdatedStocks] = useState([...initialProducts]);

  const handleStockChange = (productId, event) => {
    const newStocks = updatedStocks.map((product) => {
      if (product.id === productId) {
        return { ...product, stock: parseInt(event.target.value) || 0 };
      }
      return product;
    });
    setUpdatedStocks(newStocks);
  };

  const handleUpdateStocks = () => {
    setProducts(updatedStocks);
  };

  return (
    <div>
      <h2>Update Stocks:</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Current Stock</th>
            <th>Update Stock</th>
          </tr>
        </thead>
        <tbody>
          {updatedStocks.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) => handleStockChange(product.id, e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleUpdateStocks}>Update Stocks</button>
    </div>
  );
};

export default StockManagement;
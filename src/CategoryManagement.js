import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { styles } from './Styles';

const CatManagement = ({handleCategoryChange}) => {
  const [categories, setCategoryList] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const handleNewCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() !== '' && !categories.find(category => category.name === newCategory)) {
      const updatedCategories = [...categories, { name: newCategory }];
      setCategoryList(updatedCategories);
      setNewCategory('');
      
    } else {
      alert('Please enter a valid and unique category!');
    }
  };

  return (
    <div className="row">
      <div className="col-lg-4">
        <form style={formStyles} onSubmit={handleNewCategory}>
          <h3>Category Management</h3>
          <label htmlFor="prodCategory">
            <b>Set Category</b>
          </label>
          <input
            type="text"
            id="prodCategory"
            placeholder="Enter new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
            style={styles.inputStyles}
          />
          <button className="bg-primary btn-sm" type="submit" style={styles.buttonStyles}>
            Add Category
          </button>
        </form>
      </div>
      <div className="col-lg-8">
        <table className="table table-responsive">
          <thead className="text-center">
            <tr>
              <th scope="col" className="bg-primary text-white">
                Category
              </th>
            </tr>
          </thead>
          <tbody id="tbodyproducts" className="text-center">
            {categories.map((category, index) => (
              <tr key={index}>
                <td>{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const formStyles = {
  fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
  backgroundColor: 'white',
  padding: '0 20px',
  fontSize: '16px',
};

export default CatManagement;
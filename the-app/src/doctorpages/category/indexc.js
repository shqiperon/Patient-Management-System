import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

// Create a new context
const CategoriesContext = React.createContext();

// Custom provider component
function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/category')
      .then(response => response.json())
      .then(data => setCategories(data.categories))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      fetch(`http://127.0.0.1:8000/api/category/${id}`, { method: 'DELETE' })
        .then(() => {
          setCategories(categories.filter(category => category.id !== id));
        })
        .catch(error => console.error(error));
    }
  }

  // Provide the categories and the delete function to the consuming components
  const contextValue = { categories, handleDelete };

  return (
    <CategoriesContext.Provider value={contextValue}>
      {children}
    </CategoriesContext.Provider>
  );
}

function Indexc() {
  const { categories, handleDelete } = useContext(CategoriesContext);
  
  return (
    <div>
    <div className='container py-4'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Categories</h1>
        <Link to="/category/Create" className="btn btn-sm btn-outline-primary">
          Create
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <Link
                    to={`/category/Edit/${category.id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

// Wrap the Indexc component with the provider
function IndexcWithContext() {
  return (
    <CategoriesProvider>
      <Indexc />
    </CategoriesProvider>
  );
}

export default IndexcWithContext;
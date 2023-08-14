import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from './context';

function Vitamins() {
  const { products, setProducts } = useContext(ProductsContext);
  const [sortOption, setSortOption] = useState('Name: A-Z');

  const handleSort = (option) => {
    let sortedProducts = [...products];

    switch (option) {
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        setSortOption('Name: A-Z');
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        setSortOption('Name: Z-A');
        break;
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        setSortOption('Price: Low to High');
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        setSortOption('Price: High to Low');
        break;
      default:
        sortedProducts = [...products];
        setSortOption('None');
        break;
    }

    setProducts(sortedProducts);
  };


  return (
    <div className="box">
      <div className="container py-4">
        <div className="row">
          <div className="col-12 text-end mb-3">
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="sortDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: 'white' }}
              >
                Sort by: {sortOption}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="sortDropdown">
                <li>
                  <button className="dropdown-item" onClick={() => handleSort('name-asc')}>
                    Name: A-Z
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSort('name-desc')}>
                    Name: Z-A
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSort('price-low')}>
                    Price: Low to High
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSort('price-high')}>
                    Price: High to Low
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {products.map((product) => (
            <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
              <div className="card h-100">
                <div className="card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={`http://127.0.0.1:8000/storage/products/${product.image}`}
                    alt={product.name}
                    className="card-img-top img-fluid"
                    style={{ objectFit: 'contain', height: '100%', width: '100%' }}
                  />
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{product.name}</h5>
                  </div>
                  <div>
                    <p className="card-text">Price: {product.price} &euro;</p>
                    <button className="btn btn-primary">
                      <Link to={`/viewProduct/viewP/${product.id}`} className="text-white text-decoration-none">
                        View Product
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vitamins;

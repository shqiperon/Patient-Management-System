import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Vitamins() {
  const [product1s, setproduct1s] = useState([]);
  const [sortOption, setSortOption] = useState('Name: A-Z');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/product1s')
      .then(response => response.json())
      .then(data => setproduct1s(data.product1s))
      .catch(error => console.error(error));
  }, []);

  const handleSort = (option) => {
    let sortedproduct1s = [...product1s];

    switch (option) {
      case 'name-asc':
        sortedproduct1s.sort((a, b) => a.name.localeCompare(b.name));
        setSortOption('Name: A-Z');
        break;
      case 'name-desc':
        sortedproduct1s.sort((a, b) => b.name.localeCompare(a.name));
        setSortOption('Name: Z-A');
        break;
      case 'price-low':
        sortedproduct1s.sort((a, b) => a.price - b.price);
        setSortOption('Price: Low to High');
        break;
      case 'price-high':
        sortedproduct1s.sort((a, b) => b.price - a.price);
        setSortOption('Price: High to Low');
        break;
      default:
        sortedproduct1s = [...product1s];
        setSortOption('None');
        break;
    }

    setproduct1s(sortedproduct1s);
  };

  return (
  <div>
    <div className="box">
      <div className="container">
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
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="sortDropdown" >
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
          {product1s.map((product1) => (
            <div className="col-md-4 col-sm-6 mb-4" key={product1.id}>
              <div className="card h-100">
                <div className="card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={`http://127.0.0.1:8000/storage/product1s/${product1.image}`}
                    alt={product1.name}
                    className="card-img-top img-fluid"
                    style={{ objectFit: 'contain', height: '100%', width: '100%' }}
                  />
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{product1.name}</h5>
                  </div>
                  <div>
                    <p className="card-text">Price: {product1.price} &euro;</p>
                    <button className="btn btn-primary">
                      <Link to={`/viewproduct/viewP1/${product1.id}`} className="text-white text-decoration-none">
                        View product1
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
    </div>
    
  );
}

export default Vitamins;

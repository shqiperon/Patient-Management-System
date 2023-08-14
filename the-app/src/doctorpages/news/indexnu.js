import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Indexnu() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/news')
      .then(response => response.json())
      .then(data => setNews(data.news))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      fetch(`http://127.0.0.1:8000/api/news/${id}`, { method: 'DELETE' })
        .then(() => {
          setNews(news.filter(news => news.id !== id));
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
    <div className='container py-4'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>News</h1>
        <Link to="/news/create" className="btn btn-sm btn-outline-primary">
          Create
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Content</th>
              <th>Published At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {news.map(news => (
              <tr key={news.id}>
                <td>{news.id}</td>
                <td>{news.title}</td>
                <td>{news.content}</td>
                <td>{news.published_at}</td>
                <td>
                  <Link
                    to={`/news/edit/${news.id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(news.id)}
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

export default Indexnu;

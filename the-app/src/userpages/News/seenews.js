import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Seenews() {
  const [news, setNews] = useState([]);
  const [sortNews, setSortNews] = useState('newest');

  useEffect(() => {
    fetchNews();
  }, [sortNews]);

  const fetchNews = () => {
    fetch('http://127.0.0.1:8000/api/news')
      .then((response) => response.json())
      .then((data) => setNews(data.news))
      .catch((error) => console.error(error));
  };

  const handleSortNewsChange = (event) => {
    setSortNews(event.target.value);
  };

  const sortedNews = news.sort((a, b) => {
    if (sortNews === 'newest') {
      return new Date(b.published_at) - new Date(a.published_at);
    } else if (sortNews === 'oldest') {
      return new Date(a.published_at) - new Date(b.published_at);
    }
    return 0;
  });

  return (
    <div>
      <div className="container py-4">
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>News</h1>
            <div className="form-group">
              <label htmlFor="sortNews">Sort by:</label>
              <select
                id="sortNews"
                className="form-control"
                value={sortNews}
                onChange={handleSortNewsChange}
              >                
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
          <div className="row">
            {sortedNews.map((newsItem) => (
              <div className="col-md-12 mb-4" key={newsItem.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-8">
                        <div>
                          <h5 className="card-title">{newsItem.title}</h5>
                          <p className="card-published-at">Published: {newsItem.published_at}</p>
                          <button className="btn btn-primary">
                            <Link
                              to={`/news/${newsItem.id}`}
                              className="text-white text-decoration-none"
                            >
                              Read More
                            </Link>
                          </button>
                        </div>
                      </div>
                      <div className="col-4">
                        <div>
                          <p className="card-description">{newsItem.content}</p>
                        </div>
                      </div>
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

export default Seenews;

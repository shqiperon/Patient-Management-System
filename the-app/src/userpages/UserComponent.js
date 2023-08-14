import React, { useState, useEffect } from 'react';

const UserComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          
        } else {
          console.log('Failed to fetch user data');
        }
      } catch (error) {
        console.error('User data error:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>User Information</h2>

      {user ? (
        <div>
          <h3>Name: {user.name}</h3>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default UserComponent;
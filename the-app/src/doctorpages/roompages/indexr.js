import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Indexr() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    FetchRooms();
  }, []);

  function FetchRooms() {
    fetch('http://127.0.0.1:8000/api/rooms')
      .then(response => response.json())
      .then(data => setRooms(data.rooms))
      .catch(error => console.error(error));
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      fetch(`http://127.0.0.1:8000/api/rooms/${id}`, { method: 'DELETE' })
        .then(() => {
          setRooms(rooms.filter(room => room.id !== id));
        })
        .catch(error => console.error(error));
    }
  }

  const sendToEdit = (id) => {
    const edit = rooms.find(room => room.id === id);
    if (edit) {
      navigate(`/doctorpages/roompages/edit/${id}`, { state: { edit } });
    }
  };


  return (
    <div className='container py-4'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Rooms</h1>
        <div>
          <Link to="/doctorpages/roompages/Create" className="btn btn-sm btn-outline-primary">
            Create
          </Link>   
          &nbsp;       
          <Link to="/doctorpages/doctorhomepage" className="btn btn-sm btn-outline-primary">
            Back
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>room number</th>
              <th>status</th>
              <th>department</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.id}>
                <td>{room.room_number}</td>
                <td>{room.status}</td>
                <td>{room.department}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => sendToEdit(room.id)}
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(room.id)}
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
  );
}

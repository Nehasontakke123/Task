import React, { useEffect, useState } from 'react';
import '../assets/css/AdminPanel.css'; // Import your custom CSS

const AdminPanel = () => {
  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7001/api/users')
      .then(res => res.json())
      .then(data => setNameList(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-panel">
        <h1 className="admin-title">👩‍💼 Admin Panel</h1>
        <h2 className="admin-subtitle">📃 List of Users:</h2>
        <ul className="user-list">
          {nameList.length === 0 ? (
            <p className="no-users">No users found.</p>
          ) : (
            nameList.map((name, index) => (
              <li key={index} className="user-item">
                {index + 1}. {name}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;

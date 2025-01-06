import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
import ProjectRegistration from './ProjectRegistration'; // Importing the ProjectRegistration component

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false); // State to control the display of the project form
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details (assuming the user is already authenticated)
    const fetchedUser = { name: 'Admin User' }; // Replace with actual user fetching logic
    setUser(fetchedUser);
  }, []);

  const handleProfileClick = () => {
    // Navigate to the profile page (assuming it's implemented)
    navigate('/profile');
  };

  const handleProjectFormToggle = () => {
    setShowProjectForm(!showProjectForm);
  };

  return (
    <div className="container mt-5">
      {user && <h2 className="text-center mb-4 text-primary">Welcome, {user.name}!</h2>}
      <button className="btn btn-outline-dark mb-4" onClick={handleProfileClick}>Profile</button>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm border-primary">
            <div className="card-body bg-light text-dark">
              <h5 className="card-title text-primary">Click here for creating the users</h5>
              <p className="card-text">Easily add new users to the system, such as Project Managers and Site Engineers.</p>
              <Link to="/register" className="btn btn-primary">Registration</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm border-primary">
            <div className="card-body bg-light text-dark">
              <h5 className="card-title text-primary">Register the new projects here</h5>
              <p className="card-text">Submit new projects to be managed within the system.</p>
              <button className="btn btn-primary" onClick={handleProjectFormToggle}>Project Registration</button>
            </div>
          </div>
        </div>
      </div>
      {showProjectForm && <ProjectRegistration onClose={handleProjectFormToggle} />}
    </div>
  );
};

export default AdminDashboard;

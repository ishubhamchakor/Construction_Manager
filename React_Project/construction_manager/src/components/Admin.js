import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectRegistration from './ProjectRegistration'; // Importing the ProjectRegistration component
import './Admin.css'; // External CSS file

const AdminDashboard = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);

  const handleProjectFormToggle = () => {
    setShowProjectForm(!showProjectForm);
  };

  const handleReportFormToggle = () => {
    setShowReportForm(!showReportForm);
  };

  return (

    <div className="m-5">
      {!showProjectForm && !showReportForm ? (
        <>
          {/* Welcome Message */}
          <div className="text-center welcome-section mt-5 mb-5">
            <h2 className="text-primary">Welcome, Admin!</h2>
          </div>

          {/* Cards Section */}
          <div className="row ">
            {/* User Management */}
            <div className="col-md-4">
              <div className="custom-card">
                <div className="card-body">
                  <h5 className="card-title">Create Users</h5>
                  <p className="card-text">Easily add new users to the system.</p>
                  <Link to="/register" className="btn btn-custom">User Registration</Link>
                </div>
              </div>
            </div>

            {/* Project Registration */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="custom-card">
                <div className="card-body">
                  <h5 className="card-title">Register New Projects</h5>
                  <p className="card-text">Submit new projects to be managed.</p>
                  <button className="btn btn-custom" onClick={handleProjectFormToggle}>Project Registration</button>
                </div>
              </div>
            </div>

            {/* Generate Report */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="custom-card">
                <div className="card-body">
                  <h5 className="card-title">Generate Reports</h5>
                  <p className="card-text">Create and view system reports.</p>
                  <button className="btn btn-custom" onClick={handleReportFormToggle}>Generate Report</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : showProjectForm ? (
        <ProjectRegistration onClose={handleProjectFormToggle} />
      ) : (
        <div className="report-form">
          <h3>Generate Reports</h3>
          <button className="btn btn-danger" onClick={handleReportFormToggle}>Close</button>
        </div>
      )}
    </div>

  );
};

export default AdminDashboard;

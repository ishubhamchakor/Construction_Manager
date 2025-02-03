import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectRegistration from './ProjectRegistration'; // Importing the ProjectRegistration component

const AdminDashboard = () => {
  const [showProjectForm, setShowProjectForm] = useState(false); // State to control the display of the project form
  const [showReportForm, setShowReportForm] = useState(false); // State to control the display of the report form

  const handleProjectFormToggle = () => {
    setShowProjectForm(!showProjectForm);
  };

  const handleReportFormToggle = () => {
    setShowReportForm(!showReportForm);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', padding: '0 20px' }}>
      <div className="w-100" style={{ maxWidth: '1200px' }}>
        {/* Background Color Applied to Content Area Only */}
        <div className="content-area" style={{ backgroundColor: 'rgb(224, 231, 232)', paddingTop: '50px', width: '100%' }}>
          {!showProjectForm && !showReportForm ? (
            <>
              {/* Welcome Message */}
              <div className="text-center mb-5">
                <h2 className="text-primary">Welcome, Admin!</h2>
              </div>

              <div className="row justify-content-center mt-5">
                {/* Card for user management */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="card shadow-lg border-primary">
                    <div className="card-body bg-light text-dark">
                      <h5 className="card-title text-primary">Create Users</h5>
                      <p className="card-text">Easily add new users to the system.</p>
                      <Link to="/register" className="btn btn-primary btn-block text-dark">User Registration</Link>
                    </div>
                  </div>
                </div>

                {/* Card for project registration */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="card shadow-lg border-primary">
                    <div className="card-body bg-light text-dark">
                      <h5 className="card-title text-primary">Register New Projects</h5>
                      <p className="card-text">Submit new projects to be managed within the system.</p>
                      <button className="btn btn-primary btn-block text-dark" onClick={handleProjectFormToggle}>Project Registration</button>
                    </div>
                  </div>
                </div>

                {/* New Card for Generate Report functionality */}
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="card shadow-lg border-primary">
                    <div className="card-body bg-light text-dark">
                      <h5 className="card-title text-primary">Generate Reports</h5>
                      <p className="card-text">Create and view system reports.</p>
                      <button className="btn btn-primary btn-block text-dark" onClick={handleReportFormToggle}>Generate Report</button>
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
              {/* Placeholder for report form */}
              <button onClick={handleReportFormToggle}>Close Report Form</button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .card {
          border-radius: 12px; /* Rounded corners for a soft look */
          transition: transform 0.3s ease;
        }

        .card:hover {
          transform: translateY(-10px); /* Subtle hover effect */
        }

        .card-title {
          font-size: 20px;
          font-weight: 600;
        }

        .card-body {
          padding: 30px;
          background-color: #fff;
        }

        .btn-block {
          width: 100%;
        }

        .btn-primary {
          background-color: #f0ad4e;
          border-color: #f0ad4e;
        }

        .btn-primary:hover {
          background-color: #f0ad4e;
          border-color: #f0ad4e;
        }

        .btn-warning {
          background-color: #f0ad4e;
          border-color: #f0ad4e;
        }

        .btn-warning:hover {
          background-color: #ec971f;
          border-color: #d58512;
        }

        .btn {
          color: black; /* Text color for all buttons */
        }

        .shadow-lg {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .border-primary {
          border: 1px solid rgb(195, 255, 0);
        }

        .bg-light {
          background-color: #f8f9fa;
        }
        
        /* Custom container for centering content */
        .w-100 {
          width: 100%;
        }

        .report-form {
          text-align: center;
          background-color: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        /* Optional: Adding padding to the content area */
        .content-area {
          padding: 30px;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;

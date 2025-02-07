import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectRegistration from './ProjectRegistration'; // Importing the ProjectRegistration component

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
      <style>{`
        .welcome-section h2 {
            font-size: 26px;
            font-weight: bold;
        }

        .custom-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
        }

        .custom-card:hover {
            transform: translateY(-5px);
            box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.15);
        }

        .card-body {
            padding: 20px;
        }

        .card-title {
            font-size: 20px;
            font-weight: 600;
            color: #007bff;
        }

        .card-text {
            font-size: 14px;
            color: #555;
            margin-bottom: 15px;
        }

        .btn-custom {
            width: 100%;
            background-color: #f0ad4e;
            border: none;
            color: white;
            font-weight: 600;
            padding: 10px;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .btn-custom:hover {
            background-color: #ec971f;
            color: white;
        }

        .report-form {
            text-align: center;
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            margin: auto;
        }

        @media (max-width: 768px) {
            .custom-card {
                padding: 20px;
            }
            .btn-custom {
                padding: 8px;
            }
        }

        @media (max-width: 576px) {
            .content-area {
                padding: 20px;
            }
            .custom-card {
                padding: 15px;
            }
        }
      `}</style>

      {!showProjectForm && !showReportForm ? (
        <>
          <div className="text-center welcome-section mt-5 mb-5">
            <h2 className="text-primary">Welcome, Admin!</h2>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="custom-card">
                <div className="card-body">
                  <h5 className="card-title">Create Users</h5>
                  <p className="card-text">Easily add new users to the system.</p>
                  <Link to="/register" className="btn btn-custom">User Registration</Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="custom-card">
                <div className="card-body">
                  <h5 className="card-title">Register New Projects</h5>
                  <p className="card-text">Submit new projects to be managed.</p>
                  <button className="btn btn-custom" onClick={handleProjectFormToggle}>Project Registration</button>
                </div>
              </div>
            </div>

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

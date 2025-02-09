import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectRegistration from './ProjectRegistration';
import Register from './Register';
import { Navbar } from "./Navbar";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {!activeComponent ? (
          <>
            <div className="text-center mt-5 mb-4">
              <h2 className="text-primary fw-bold">Welcome, Admin!</h2>
            </div>

            <div className="row g-4">
              {/* Create Users Card */}
              <div className="col-md-4">
                <div className="card shadow border-0 text-center p-4">
                  <div className="card-body">
                    <h5 className="card-title text-primary fw-bold">Create Users</h5>
                    <p className="card-text text-muted">Easily add new users to the system.</p>
                    <button className="btn btn-warning w-100 fw-bold" onClick={() => setActiveComponent('register')}>
                      User Registration
                    </button>
                  </div>
                </div>
              </div>

              {/* Register New Projects Card */}
              <div className="col-md-4">
                <div className="card shadow border-0 text-center p-4">
                  <div className="card-body">
                    <h5 className="card-title text-primary fw-bold">Register New Projects</h5>
                    <p className="card-text text-muted">Submit new projects to be managed.</p>
                    <button className="btn btn-warning w-100 fw-bold" onClick={() => setActiveComponent('project')}>
                      Project Registration
                    </button>
                  </div>
                </div>
              </div>

              {/* Generate Reports Card */}
              <div className="col-md-4">
                <div className="card shadow border-0 text-center p-4">
                  <div className="card-body">
                    <h5 className="card-title text-primary fw-bold">Generate Reports</h5>
                    <p className="card-text text-muted">Create and view system reports.</p>
                    <button className="btn btn-warning w-100 fw-bold" onClick={() => setActiveComponent('report')}>
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : activeComponent === 'project' ? (
          <ProjectRegistration onClose={() => setActiveComponent(null)} />
        ) : activeComponent === 'register' ? (
          <Register onClose={() => setActiveComponent(null)} />
        ) : (
          <div className="card shadow p-4 text-center w-50 mx-auto">
            <h3 className="text-primary">Generate Reports</h3>
            <button className="btn btn-danger mt-3" onClick={() => setActiveComponent(null)}>
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Task from './Task';

const ProjectManager = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showIssues, setShowIssues] = useState(false);
  const [issues, setIssues] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const baseURL = 'http://localhost:8173';

  const projects = [
    { id: 1, name: "Residential Tower A", description: "High-rise residential project in Sector 45, Gurgaon" },
    { id: 2, name: "Commercial Complex B", description: "Office and retail space in Baner, Pune" },
    { id: 3, name: "Industrial Park C", description: "Manufacturing & logistics hub in Hinjawadi, Pune" },
  ];

  const handleProjectDetails = (project) => {
    setSelectedProject(project);
    setShowIssues(false);
    setShowTaskForm(false);
  };

  const handleCreateTask = () => {
    setShowTaskForm(true);
    setSelectedProject(null);
    setShowIssues(false);
  };

  const handleFetchIssues = async () => {
    try {
      const response = await axios.get(`${baseURL}/getAllIssues`);
      setIssues(response.data);
      setShowIssues(true);
      setSelectedProject(null);
      setShowTaskForm(false);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setShowIssues(false);
    setShowTaskForm(false);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', padding: '0 20px' }}>
      <div className="w-100" style={{ maxWidth: '1200px' }}>
        <div className="content-area" style={{ backgroundColor: 'rgb(224, 231, 232)', paddingTop: '50px', width: '100%' }}>
          <div className="text-center mb-4">
            <h4 className="text-primary">Welcome to the Project Manager Dashboard!</h4>
          </div>
          
          {!selectedProject && !showIssues && !showTaskForm && (
            <div className="row justify-content-center">
              {projects.map((project) => (
                <div className="col-lg-4 col-md-6 mb-4" key={project.id}>
                  <div className="card shadow-lg border-primary">
                    <div className="card-body bg-light text-dark">
                      <h5 className="card-title text-primary">{project.name}</h5>
                      <p className="card-text">{project.description}</p>
                      <div className="d-flex flex-column">
                        <button className="btn btn-info mb-2" onClick={() => handleProjectDetails(project)}>Project Details</button>
                        <button className="btn btn-primary mb-2" onClick={handleCreateTask}>Create Task</button>
                        <button className="btn btn-warning mb-2" onClick={handleFetchIssues}>View Issues</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showTaskForm && <Task onClose={handleCloseTaskForm} />}

          {showIssues && (
            <section className="mt-4 p-4 bg-light border rounded">
              <h4>Project Issues</h4>
              <ul>
                {issues.map((issue, index) => (
                  <li key={index}>{issue.description}</li>
                ))}
              </ul>
              <div className="text-center mt-2">
                <button className="btn btn-secondary" onClick={handleBackToProjects}>Back to Projects</button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProjectManager.css';
import Task from './Task';

const ProjectManager = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showIssues, setShowIssues] = useState(false);
  const baseURL = 'http://localhost:8173'; 

  const projects = [
    { id: 1, name: "Residential Tower A", description: "High-rise residential project in Sector 45, Gurgaon" },
    { id: 2, name: "Commercial Complex B", description: "Office and retail space in Baner, Pune" },
    { id: 3, name: "Industrial Park C", description: "Manufacturing & logistics hub in Hinjawadi, Pune" },
  ];

  const handleProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const handleCreateTask = () => {
    setSelectedProject({ createTask: true });
  };

  const handleFetchIssues = () => {
    setShowIssues(true);
  };

  const handleCloseTaskForm = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <div>
        <div className="bg-primary position-sticky sticky-top p-2">
          <h3 className="heading text-center text-white">Project Manager Dashboard</h3>
        </div>

        <div className="container mt-5">
          <h4 className="text-center mb-4">Welcome to the Project Manager Dashboard!</h4>

          <div className="row">
            {projects.map((project) => (
              <div className="col-md-4 mb-4 d-flex justify-content-center" key={project.id}>
                <div className="card p-4" style={{ width: "20rem", borderRadius: "15px" }}>
                  <h3 className="card-title text-center">{project.name}</h3>
                  <div className="card-body">
                    <p className="card-text">{project.description}</p>
                  </div>
                  <div className="card-footer text-center">
                    <button className="btn btn-info mr-2" onClick={() => handleProjectDetails(project)}>Project Details</button>
                    <button className="btn btn-primary mr-2" onClick={handleCreateTask}>Create Task</button>
                    <button className="btn btn-warning" onClick={handleFetchIssues}>View Issues</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedProject && selectedProject.createTask && (
            <div className="mt-4">
              <Task baseURL={baseURL} onClose={handleCloseTaskForm} />
            </div>
          )}

          {showIssues && (
            <section className="mt-4 p-4 bg-light border rounded">
              <h4>Project Issues</h4>
              <ul>
                <li>Issue 1: Delayed material supply</li>
                <li>Issue 2: Weather conditions affecting construction</li>
                <li>Issue 3: Labor shortage</li>
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectManager;

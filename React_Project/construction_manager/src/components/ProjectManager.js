import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectsDetailsModel from './ProjectsDetailsModel';
import { useNavigate } from 'react-router-dom';

const ProjectManager = () => {

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]); // Holds all tasks

  const navigate = useNavigate();

  // Fetch all projects on component mount
  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8173/api/getAllProject");
      setProjects(response.data);  // Update state with API data
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Fetch tasks for a specific project when a project is selected
  const fetchTasksForProject = async (projectId) => {
    try {
      const response = await axios.get(`http://localhost:8173/getTasksByProjectId/${projectId}`);
      setTasks(response.data); // Filter tasks based on projectId
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Handle project selection
  const handleViewDetails = (project) => {
    setSelectedProject(null); // Reset selected project
    setTimeout(() => {
      setSelectedProject(project); // Set the selected project
      fetchTasksForProject(project.id); // Fetch tasks for selected project
    }, 50);
  };

  // Open modal when selectedProject is updated
  useEffect(() => {
    if (selectedProject) {
      const modalElement = document.getElementById("taskInfoModal");
      if (modalElement) {
        const modal = new window.bootstrap.Modal(modalElement, { backdrop: 'static' });
        modal.show();
      }
    }
  }, [selectedProject]);

  return (
    <div className="container-fluid">
      <div className="content-area">
        <div className="text-center mb-4 mt-5">
          <h2 className="text-primary mb-5">Welcome to the Project Manager Dashboard!</h2>
        </div>

        <div className="row justify-content-center">
          {projects.map((project) => (
            <div className="col-md-4 mb-4" key={project.id}>
              <div className="card shadow-lg hover-card">
                <div className="card-body text-dark">
                  <h5 className="card-title text-primary">{project.projectName}</h5>
                  <p className="card-text">{project.description}</p>
                  <div className="d-flex flex-column">
                    <button className="btn btn-info mb-2" onClick={() => handleViewDetails(project)}>
                      Project Details
                    </button>
                    <button className="btn btn-primary mb-2" onClick={() => navigate("/taskCreation")}>Create Task</button>

                    {/* Dynamic Task Issues Dropdown */}
                    <select className="form-select btn btn-warning" aria-label="Default select example">
                      <option value="">Select task issue</option>
                      {tasks.map((task) => (
                        <option key={task.id} value={task.id}>{task.taskname}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Component */}
      {selectedProject && <ProjectsDetailsModel selectedProject={selectedProject} />}
    </div>
  );
};

export default ProjectManager;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

const AdminLandingPage = () => {
  const [projects, setProjects] = useState([]);
  const [projectManagers, setProjectManagers] = useState({});

  useEffect(() => {
    // Fetch projects from the API
    axios.get('http://your-api-endpoint/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });

    // Fetch project managers from the API
    axios.get('http://your-api-endpoint/project-managers')
      .then(response => {
        setProjectManagers(response.data);
      })
      .catch(error => {
        console.error('Error fetching project managers:', error);
      });
  }, []);

  const handleManagerChange = (projectId, managerId) => {
    // Update the project manager for a specific project
    axios.post(`http://your-api-endpoint/projects/${projectId}/assign-manager`, { managerId })
      .then(response => {
        console.log('Project manager updated:', response.data);
        // Update the state to reflect changes if needed
      })
      .catch(error => {
        console.error('Error updating project manager:', error);
      });
  };

  return (
    <main className="admin-main">
      <h2>Admin Dashboard</h2>
      <div className="project-list">
        {projects.map(project => (
          <div key={project.id} className="project-item">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <label>
              Select Project Manager:
              <select
                value={project.managerId || ''}
                onChange={e => handleManagerChange(project.id, e.target.value)}
              >
                <option value="">Select a manager</option>
                {projectManagers.map(manager => (
                  <option key={manager.id} value={manager.id}>{manager.name}</option>
                ))}
              </select>
            </label>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AdminLandingPage;

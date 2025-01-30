import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectRegistration = ({ onClose, existingProject }) => {
  const [formData, setFormData] = useState({
    projectId: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    userId: '', // Managed by User ID
    file: null,
    status: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Populate form with existing project data if editing
  useEffect(() => {
    if (existingProject) {
      setFormData({
        projectId: existingProject.projectId,
        name: existingProject.name,
        description: existingProject.description,
        startDate: existingProject.startDate,
        endDate: existingProject.endDate,
        userId: existingProject.userId,
        file: null,
        status: existingProject.status,
      });
    }
  }, [existingProject]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const projectData = {
      projectId: formData.projectId || null,
      name: formData.name,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      userId: formData.userId,
      status: formData.status,
    };
  
    try {
      const response = await axios.post('http://localhost:1111/projects/newProject', projectData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setSuccessMessage('Project registered/updated successfully');
        setErrorMessage('');
        //onClose();
      } else {
        throw new Error('Failed to register/update project');
      }
    } catch (error) {
      setErrorMessage('Error registering/updating project: ' + error.message);
      setSuccessMessage('');
    }
  };
  

  return (
    <main className="container mt-5">
      <section className="registration">
        <h2 className="text-center mb-4 text-primary">Register/Update Project</h2>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required></textarea>
          </div>
          <div className="form-group">
            <label>Start Date:</label>
            <input type="date" name="startDate" className="form-control" value={formData.startDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>End Date:</label>
            <input type="date" name="endDate" className="form-control" value={formData.endDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Managed By (User ID):</label>
            <input type="text" name="userId" className="form-control" value={formData.userId} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>File Attachment:</label>
            <input type="file" name="file" className="form-control" onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select name="status" className="form-control" value={formData.status} onChange={handleChange}>
              <option value="">Select status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Register/Update Project</button>
          <button type="button" className="btn btn-secondary ml-2" onClick={onClose}>Cancel</button>
        </form>
      </section>
    </main>
  );
};

export default ProjectRegistration;
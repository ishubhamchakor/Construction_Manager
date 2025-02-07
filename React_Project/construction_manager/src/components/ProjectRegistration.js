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
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Populate form with existing project data if editing
  useEffect(() => {
    if (existingProject) {
      setFormData({
        projectId: existingProject.projectId || '',
        name: existingProject.name || '',
        description: existingProject.description || '',
        startDate: existingProject.startDate || '',
        endDate: existingProject.endDate || '',
        userId: existingProject.userId || '',
        file: null, // Reset file input when editing
        status: existingProject.status || '',
      });
    }
  }, [existingProject]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input separately
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send project data along with the file
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('startDate', formData.startDate);
    form.append('endDate', formData.endDate);
    form.append('managedBy', formData.userId);
    if (formData.file) {
      form.append('file', formData.file);
    }

    try {
      const response = await axios.post('http://localhost:8173/api/newProject', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setSuccessMessage("Project registered/updated successfully");
        setErrorMessage("");
      } else {
        throw new Error("Failed to register/update project");
      }
    } catch (error) {
      setErrorMessage("Error registering/updating project: " + error.message);
      setSuccessMessage("");
    }
  };

  return (
    <main className="container mt-5">
      <section className="registration">
        <h2 className="text-center mb-4 text-primary">Register/Update Project</h2>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <br/>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <br/>

          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <br/>

          <div className="form-group">
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              className="form-control"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <br/>

          <div className="form-group">
            <label>Managed By (User ID):</label>
            <input
              type="text"
              name="userId"
              className="form-control"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </div>

          <br/>

          <div className="form-group">
            <label>File Attachment:</label>
            <input
              type="file"
              name="file"
              className="form-control"
              onChange={handleFileChange}
            />
           </div>

          {/*<div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Select status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div> */}
          <div className='d-flex justify-content-between'>
            <div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          <div>
            <button type="button" className="btn btn-secondary ml-2" onClick={onClose}>
              Cancel
            </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ProjectRegistration;
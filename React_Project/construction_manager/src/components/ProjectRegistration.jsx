import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectRegistration = ({ onClose, existingProject }) => {
  const [formData, setFormData] = useState({
    projectId: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    userId: '',
    file: null,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (existingProject) {
      setFormData({
        projectId: existingProject.projectId || '',
        name: existingProject.name || '',
        description: existingProject.description || '',
        startDate: existingProject.startDate || '',
        endDate: existingProject.endDate || '',
        userId: existingProject.userId || '',
        file: null,
        status: existingProject.status || '',
      });
    }
  }, [existingProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <main className="project-registration-container">
      <section className="registration">
        <h2 className="text-center mb-4 text-primary">Register Project</h2>

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

          <div className="form-group">
            <label>File Attachment:</label>
            <input
              type="file"
              name="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>

          <div className='d-flex justify-content-between'>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </section>

      <style jsx>{`
        body {
          background-color: #f4f4f4;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .project-registration-container {
          width: 500px;
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
        }

        .registration h2 {
          text-align: center;
          color: #007bff;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        .btn-primary {
          background-color: #007bff;
          border: none;
          padding: 10px 15px;
          color: white;
          border-radius: 8px;
          cursor: pointer;
        }

        .btn-secondary {
          background-color: #6c757d;
          border: none;
          padding: 10px 15px;
          color: white;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
    </main>
  );
};

export default ProjectRegistration;

import React, { useState } from 'react';
import axios from 'axios';

const ProjectRegistration = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    file: null,
    status: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post("http://localhost:8173/newProject", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Project registered successfully");
      onClose(); // Close the form after successful registration
    } catch (error) {
      console.error("Error registering project:", error);
    }
  };

  return (
    <main className="container mt-5 border rounded shadow-lg bg-white p-5 col-8">
      <section className="registration">
        <h2 className="text-center mb-4 text-primary">Register Project</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='row'>
            <div className="form-group mb-3">
              <label>Name:</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <label>Description:</label>
              <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required></textarea>
            </div>

          </div>

          <div className="form-group mb-3">
            <label>Start Date:</label>
            <input type="date" name="startDate" className="form-control" value={formData.startDate} onChange={handleChange} required />
          </div>
          <div className="form-group mb-3">
            <label>End Date:</label>
            <input type="date" name="endDate" className="form-control" value={formData.endDate} onChange={handleChange} required />
          </div>

          <div className="form-group mb-3">
            <label>File Attached:</label>
            <input type="file" name="file" className="form-control" onChange={handleChange} />
          </div>
          <div className="form-group mb-3">
            <label>Status:</label>
            <select name="status" className="form-control" value={formData.status} onChange={handleChange}>
              <option value="">Select status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className='d-flex justify-content-between'>
            <div>
              <button type="submit" className="btn btn-primary">Register Project</button>
            </div>
            <div>
              <button type="button" className="btn btn-secondary ml-2" onClick={onClose}>Cancel</button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ProjectRegistration;

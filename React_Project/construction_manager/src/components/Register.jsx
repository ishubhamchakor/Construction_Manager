import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: '',
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,}$/.test(password);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 4 characters, include 1 number and 1 special character';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post('http://localhost:8170/auth/newUser', {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        role: { roleID: formData.roleId },
      });
      alert('User registered successfully');
      onClose(); // Close the form
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 w-50">
        <h2 className="text-center mb-3">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-control" />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required className="form-control" />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label">Recheck Password:</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="form-control" />
            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label">Register as:</label>
            <select name="roleId" value={formData.roleId} onChange={handleChange} required className="form-select">
              <option value="" disabled>Select role</option>
              <option value={2}>Project Manager</option>
              <option value={3}>Site Engineer</option>
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Register</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
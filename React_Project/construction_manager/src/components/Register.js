import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8172/newUser', {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        role: {
          roleID: formData.roleId,
        },
      });
      alert('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <main className="App-main">
      <header className="header">
        <img
          src="https://thumbs.dreamstime.com/b/construction-manager-controlling-project-92629952.jpg"
          alt="Construction Manager Logo"
          className="logo"
        />
        <h1>Construction Manager</h1>
      </header>
      <section className="register">
        <h2>Register</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Recheck Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Register as:
            <select name="roleId" value={formData.roleId} onChange={handleChange} required>
              <option value="" disabled>
                Select role
              </option>
              <option value={2}>Project Manager</option>
              <option value={3}>Site Engineer</option>
              <option value={4}>Client</option>
            </select>
          </label>
          <button type="submit">Register</button>
        </form>
        <p className="text-center">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </section>
    </main>
  );
};

export default Register;

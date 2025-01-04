import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:1111/login', formData);

      // Check the roleID returned by the backend
      const roleID = response.data.roleID; // Assuming the backend returns "roleID"
      console.log('Login successful with Role ID:', roleID);

      if (roleID === 1) {
        console.log('Admin login successful');
        navigate('/admin'); // Redirect to the admin page
      } else if (roleID === 2) {
        console.log('Project_Manager login successful');
        navigate('/projectManager'); // Redirect to the user dashboard
      } else if (roleID === 3) {
        console.log('SiteEngineer login successful');
        navigate('/SiteEngineer'); // Redirect to the manager dashboard
      } else if (roleID === 4) {
        console.log('Client login successful');
        navigate('/Client'); // Redirect to the Client dashboard
      } else {
        console.error('Unknown role ID:', roleID);
        setErrorMessage('Unknown role. Please contact support.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <main className="App-main">
      <section className="login">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <p className="text-center">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </section>
    </main>
  );
};

export default Login;

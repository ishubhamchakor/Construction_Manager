import React, { useState } from 'react';
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
            </select>
          </label>
          <button type="submit">Register</button>
        </form>
        <p className="text-center">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </section>

      <style jsx>{`
        /* Global Reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Header Styles */
        .header {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 20px;
          background-color: #007bff;
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          height: 80px;
        }

        .header .logo {
          width: 50px;
          height: 50px;
          margin-right: 15px;
          border-radius: 50%;
        }

        .header h1 {
          font-size: 26px;
          font-weight: 600;
          margin: 0;
        }

        /* Center Registration Container */
        .register {
          width: 450px;
          height: auto;
          padding: 25px;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 15px;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
          text-align: center;
          margin-top: 100px;
        }

        /* Form Label Styling */
        .register form label {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 10px;
          display: block;
          text-align: left;
        }

        .register form input,
        .register form select {
          width: 100%;
          padding: 10px 12px;
          font-size: 16px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        .register form input:focus,
        .register form select:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);
        }

        /* Register Button Styling */
        .register form button {
          width: 100%;
          padding: 12px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
        }

        .register form button:hover {
          background-color: #0056b3;
        }

        /* Error Message */
        .error-message {
          color: #d9534f;
          margin-bottom: 15px;
          text-align: center;
        }

        /* Links */
        .register .text-center {
          margin-top: 20px;
        }

        .register .text-center a {
          color: #007bff;
          text-decoration: none;
        }

        .register .text-center a:hover {
          text-decoration: underline;
        }
      `}</style>
    </main>
  );
};

export default Register;

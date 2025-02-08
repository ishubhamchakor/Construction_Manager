import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { loginSuccess } from '../redux/Slice/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:8172/login', formData);
      const data = response.data; // Check the roleID returned by the backend
      const roleID = data.role.roleID; // Assuming the backend returns "roleID"

      console.log('Login successful with Role ID:', roleID);

      dispatch(
        loginSuccess({
          username: data.name,
          role: data.role.roleID,
          email: data.email,
          uid: data.userID,
        })
      );

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
          <p className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </form>
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
          height: 100vh; /* Full height of the viewport */
          display: flex; /* Use Flexbox for centering */
          justify-content: center; /* Center horizontally */
          align-items: center; /* Center vertically */
        }

        /* Center Login Container */
        .login {
          width: 400px;
          height: auto; /* Adjusted to auto based on content */
          padding: 40px;
          background-color: #fff;
          border-radius: 10px; /* Rounded corners for a soft look */
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        h2 {
          font-size: 30px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #333;
        }

        /* Form Label Styling */
        .login form label {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 10px;
          display: block;
          text-align: left;
          color: #333;
        }

        /* Form Input Styling */
        .login form input {
          width: 100%;
          padding: 14px 12px; /* Comfortable padding */
          font-size: 16px; /* Larger font size for better visibility */
          margin-bottom: 20px;
          border: 1px solid #ccc;
          border-radius: 8px; /* Slight rounding for inputs */
          background-color: #f9f9f9; /* Soft background for inputs */
        }

        .login form input:focus {
          border-color: #007bff;
          outline: none;
          box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);
        }

        .login form input::placeholder {
          color: #888;
          font-style: italic;
        }

        /* Login Button Styling */
        .login form button {
          width: 100%;
          padding: 12px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          font-weight: bold;
        }

        .login form button:hover {
          background-color: #0056b3;
        }

        /* Forgot Password Link Styling */
        .forgot-password {
          margin-top: 15px;
        }

        .forgot-password a {
          color: #007bff;
          text-decoration: none;
          font-size: 14px;
        }

        .forgot-password a:hover {
          text-decoration: underline;
        }

        /* Error Message */
        .error-message {
          color: #d9534f;
          margin-bottom: 15px;
          text-align: center;
        }

        /* Small screen adjustments */
        @media (max-width: 400px) {
          .login {
            width: 90%;
            padding: 30px;
          }
        }
      `}</style>
    </main>
  );
};

export default Login; 
  


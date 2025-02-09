import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginSuccess } from '../redux/Slice/authSlice';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[\W_]).{4,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate input while typing
    if (name === 'email') {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? '' : 'Invalid email format',
      }));
    }

    if (name === 'password') {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ''
          : 'Password must be at least 4 characters, include 1 special character and 1 number',
      }));
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error when field is clicked
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Revalidate when clicking away
    if (name === 'email' && value && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
    }

    if (name === 'password' && value && !validatePassword(value)) {
      setErrors((prev) => ({
        ...prev,
        password:
          'Password must be at least 4 characters, include 1 special character and 1 number',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Final validation check before submission
    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          'Password must be at least 4 characters, include 1 special character and 1 number',
      }));
      return;
    }

    try {
      const response = await axios.post('http://localhost:8172/login', formData);
      const data = response.data;
      const roleID = data.role.roleID;

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
        navigate('/admin');
      } else if (roleID === 2) {
        console.log('Project_Manager login successful');
        navigate('/projectManager');
      } else if (roleID === 3) {
        console.log('SiteEngineer login successful');
        navigate('/SiteEngineer');
      } else if (roleID === 4) {
        console.log('Client login successful');
        navigate('/Client');
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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-3">Login</h2>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};
export default Login;

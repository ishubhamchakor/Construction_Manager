import React, { useState } from 'react';
import './Register.css';
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    
    name: '',
    email: '',
    password: '',
    roleId: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);


try {
      const response = await axios.post("http://localhost:1111/newUser", {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        role: {
          roleID: formData.roleId,
        },
      });
      alert("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error);
    }


  };

  return (
    <main className="App-main">
      <section className="registration">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>
          <label>register as :</label>
        <select
          name="roleId"
          value={formData.roleId}
          onChange={handleChange}
        >
          <option value={2}>project Manager</option>
          <option value={3}>Site Engineer</option>
          <option value={4}>Client</option>
        </select>
          <button type="submit">Register</button>
        </form>
      </section>
    </main>
  );
};

export default Registration;

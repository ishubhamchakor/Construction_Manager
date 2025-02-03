import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../Assets/Construction.webp'; // Use high-resolution image

function Home() {
  return (
    <div className="App">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body, html {
          width: 100%;
          height: 100%;
          overflow: hidden;
          font-family: Arial, sans-serif;
          background-color: #fffad5;
        }

        .App-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: url(${backgroundImage}) no-repeat center center;
          background-size: cover;
          background-attachment: fixed;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-top: 2rem;
          position: relative;
        }

        /* Faded overlay for better contrast */
        .App-header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4); /* 40% black overlay */
          z-index: 1;
        }

        .app-title {
          font-size: 3.5rem;
          font-weight: bold;
          color: #FFD700; /* Bright yellow */
          text-transform: uppercase;
          text-align: center;
          width: 100%;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
          position: relative;
          z-index: 2;
        }

        .content {
          position: absolute;
          top: 50%;
          left: 5%;
          transform: translateY(-50%);
          max-width: 500px;
          z-index: 2;
        }

        .app-description {
          font-size: 1.2rem;
          color:rgb(245, 245, 249); /* White text */
          line-height: 1.6;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
        }

        .login-button {
          position: absolute;
          bottom: 2rem; /* Space from the bottom */
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }

        .cta-button {
          padding: 0.75rem 1.5rem;
          background-color: #1E90FF; /* Blue color */
          color: #fff;
          border-radius: 4px;
          text-decoration: none;
          font-weight: bold;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      <header className="App-header">
        {/* Centered Web Application Name */}
        <h1 className="app-title">Construction Manager</h1>

        {/* Left-Sided Middle Description */}
        <div className="content">
          <p className="app-description">
            Construction Manager is a powerful web application designed to enhance construction 
            project management. It provides real-time project tracking, team collaboration, and 
            ensure efficiency and productivity in the construction industry.
          </p>
        </div>

        {/* Login Button */}
        <div className="login-button">
          <Link to="/login" className="cta-button">Login</Link>
        </div>
      </header>
    </div>
  );
}

export default Home;

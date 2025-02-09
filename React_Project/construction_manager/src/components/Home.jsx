import React from 'react';
import { Link } from 'react-router-dom';
import constructImage from '../Assets/construct_img1.webp'; // Import the image

function Home() {
  return (
    <div className="construction-bg" style={{ backgroundImage: `url(${constructImage})` }}>
      <header className="App-header">
        <h1>Construction Manager</h1>
      </header>

      <main className="App-main">
        <section className="hero">
          <div className="hero-text">
            <h2>Better Construction Management</h2>
            <p>Optimize your construction projects with advanced tools and real-time updates. Manage your team effectively and streamline your workflow for maximum efficiency.</p>
            <div className="cta-buttons">
              <Link to="/login" className="cta-button">Login</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <p>&copy; 2025 Construction Manager. All rights reserved.</p>
      </footer>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          color: #333;
          overflow-x: hidden;
        }

        .construction-bg {
          background-size: cover;
          background-position: center;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .App-header {
          color: #fff;
          padding: 2rem;
          text-align: center;
          background: rgba(0, 0, 0, 0.5);
          margin-bottom: 2rem;
        }

        .App-header h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          animation: fadeIn 2s ease-out;
        }

        nav ul {
          list-style: none;
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        nav a {
          color: #fff;
          text-decoration: none;
          font-size: 1.2rem;
          transition: color 0.3s ease;
        }

        nav a:hover {
          color: #ffd700;
        }

        .App-main {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
        }

        .hero {
          text-align: center;
          background: rgba(0, 0, 0, 0.7);
          padding: 3rem 1.5rem;
          border-radius: 8px;
          width: 100%;
          max-width: 900px;
          margin: 2rem;
        }

        .hero h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #ffd700;
          animation: fadeIn 2s ease-out;
        }

        .hero p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: #fff;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        .cta-button {
          padding: 0.75rem 2rem;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          font-size: 1.1rem;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .cta-button:hover {
          background-color: #0056b3;
          color: black;
          transform: scale(1.1);
        }

        .App-footer {
          text-align: center;
          padding: 1rem 0;
          background-color: rgba(0, 0, 0, 0.7);
          color: #fff;
        }

        @media (max-width: 768px) {
          .hero h2 {
            font-size: 2rem;
          }

          .hero p {
            font-size: 1rem;
          }

          .cta-buttons {
            flex-direction: column;
            gap: 1rem;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Home;

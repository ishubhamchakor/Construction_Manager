import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Construction Manager</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/project">Projects</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="register">Register</a></li>
          </ul>
        </nav>

        <main className="App-main">
          <section className="hero">
            <div className="hero-text">
              <h2>Better Construction Management</h2>
              <p>Optimize your construction projects with advanced tools and real-time updates. Manage your team effectively and streamline your workflow for maximum efficiency.</p>
              <div className="cta-buttons">
                <Link to="/login" className="cta-button">Login</Link>
                <Link to="/register" className="cta-button">Register</Link>
              </div>
            </div>
          </section>
        </main>
        <footer className="App-footer">
          <p>&copy; 2025 Construction Manager. All rights reserved.</p>
        </footer>
      </header>
    </div>
  );
}

export default Home;

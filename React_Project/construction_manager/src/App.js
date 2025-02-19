import Home from './components/Home';
import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Registration from './components/Register';
import LoginPage from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLandingPage from './components/Admin';
import Projectmanager from './components/ProjectManager';
import SiteEngineer from './components/SiteEngineer';
import { RaiseIssue } from './components/RaiseIssue';
import { TaskCreation } from './components/TaskCreation';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/admin" element={< AdminLandingPage />} />
      <Route path="/projectManager" element={<Projectmanager />} />
      <Route path="/siteEngineer" element={<SiteEngineer />} />
      <Route path="/raiseIssue/:id" element={<RaiseIssue />} />
      <Route path='/taskCreation' element={<TaskCreation/>} />
    </Routes>
  );
}

export default App;

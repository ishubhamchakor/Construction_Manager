import logo from './logo.svg';
import Home from './components/Home';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Register';
import LoginPage from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLandingPage from './components/Admin';
import Projectmanager from './components/ProjectManager';
import SiteEngineer from './components/SiteEngineer';
import Client from './components/Client';
import Projects from './components/Projects';
import { useSelector } from 'react-redux';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path="/register" element={<Registration/>} />
    <Route path="/admin" element={< AdminLandingPage/>} />
    <Route path="/projectManager" element={ <Projectmanager/>} />
    <Route path="/SiteEngineer" element={ <SiteEngineer/>} />
    <Route path="/Client" element={ <Client/>} />
    <Route path="/project" element={ <Projects/>} />
  </Routes>
  );
}

export default App;

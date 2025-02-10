import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setProjectId } from "../redux/Slice/projectActions";
import { useDispatch , useSelector } from "react-redux";
import TaskShowModel from "./TaskShowModel";
import SelectTaskProject from './SelectTaskProject';
import ProjectsDetailsModel from "./ProjectsDetailsModel";
import { Navbar } from "./Navbar";

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const authState = useSelector((state) => state.auth);
  const userID = authState.user ? authState.user.uid : null;

  const username = authState.user ? authState.user.name : "User"; 
  


  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:8170/crud/managed-by/${userID}`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setTimeout(() => {
      const modal = new window.bootstrap.Modal(document.getElementById("projectDetailsModal"));
      modal.show();
    }, 100);
  };

  const handleCreateTask = (project) => {
    dispatch(setProjectId(project.projectid));
    navigate("/taskCreation", { state: { projectid: project.projectid } });
  };

  return (
    <>
   <Navbar/>
   <div className="container-fluid">
        <div className="text-center mb-4 mt-5">
          <h2 className="text-primary mb-5">Welcome to Project Manager Dashboard</h2> 
        </div>

      <div className="row justify-content-center">
        {projects.map((project) => (
          <div className="col-md-4 mb-4" key={project.projectid}>
            <div className="card shadow-lg">
              <div className="card-body text-dark">
                <h5 className="card-title text-primary">{project.projectName}</h5>
                <p className="card-text">{project.description}</p>
                <div className="d-flex flex-column">
                  <button className="btn btn-info mb-2" onClick={() => handleViewDetails(project)}>
                    Project Details
                  </button>
                  <button className="btn btn-primary mb-2" onClick={() => handleCreateTask(project)}>
                    Create Task
                  </button>
                  {<SelectTaskProject selectedProject={project} setShowModal={setShowModal} setSelectedTask={setSelectedTask} />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && <ProjectsDetailsModel selectedProject={selectedProject} />}
      {showModal && selectedTask && <TaskShowModel setShowModal={setShowModal} selectedTask={selectedTask} />}
    </div>
    </>
  );
};

export default ProjectManager;
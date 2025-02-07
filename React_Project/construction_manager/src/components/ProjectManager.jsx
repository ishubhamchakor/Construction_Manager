import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectsDetailsModel from "./ProjectsDetailsModel";
import { useNavigate } from "react-router-dom";
import { setProjectId } from "../redux/Slice/projectActions";
import { useDispatch } from "react-redux";

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [issues, setIssues] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8173/api/getAllProject");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchTasksForProject = async (project) => {
    try {
      const response = await axios.get(`http://localhost:8173/getAllTaskprojectbyId/${project.projectid}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleViewDetails = (project) => {
    setSelectedProject(null);
    setTimeout(() => {
      setSelectedProject(project);
      fetchTasksForProject(project);
    }, 50);
  };

  useEffect(() => {
    if (selectedProject) {
      const modalElement = document.getElementById("taskInfoModal");
      if (modalElement) {
        const modal = new window.bootstrap.Modal(modalElement, { backdrop: "static" });
        modal.show();
      }
    }
  }, [selectedProject]);

  const handleCreateTask = (project) => {
    dispatch(setProjectId(project.projectid));
    navigate("/taskCreation", { state: { projectid: project.projectid } });
  };





//code to make changes for issue 




  useEffect(() => {
    if (selectedProject) {
      fetchTasksForProject(selectedProject);
    } else {
      setTasks([]);
    }
  }, [selectedProject]);

  const handleTaskChange = async (event) => {
    const taskId = event.target.value;
    setSelectedTask(taskId);

    if (taskId) {
      try {
        const response = await axios.get(`http://localhost:8173/task_Issues/${taskId}`);

        console.log(response.data)
        if (response.ok) {
          setIssues(response.data);
          return;
        }
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
        setIssues([]);
      }
    } else {
      setIssues([]);
    }
  };

  const showIssues = (task) => {
    if (issues.length > 0) {
      alert(`Issues for ${task.taskname}: ${issues.map((issue) => issue.issue_name).join(", ")}`);
    } else {
      alert("No issues found for this task.");
    }
  };




 // end of issue related code



  

  return (
    <div className="container-fluid">
    <style>{`
  .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  button {
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 6px rgba(123, 93, 93, 0.1);
    color: black !important; /* Set text color to black */
    font-weight: bold;
  }
  button:hover {
    transform: scale(1.05);
  }
  button:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.25);
  }
  
  /* Saffron button - for btn-info */
  .btn-info {
    background-color:rgb(234, 193, 151) !important; /* Saffron color */
    border-color: #e68a00 !important;
  }
  .btn-info:hover {
    background-color: #FFB84D; /* Lighter saffron on hover */
  }
  
  /* White button - for btn-primary */
  .btn-primary {
    background-color: #FFFFFF !important; /* White color */
    border-color: #d6d6d6 !important;
  }
  .btn-primary:hover {
    background-color: #f2f2f2; /* Lightened white on hover */
  }

  /* Green button - for btn-warning */
  .btn-warning {
    background-color:rgb(205, 232, 203) !important; /* Green color */
    border-color: #106c06 !important;
  }
  .btn-warning:hover {
    background-color: #3cb34c; /* Lighter green on hover */
  }

  .btn-secondary:hover {
    background-color: #e0e0e0;
    transform: scale(1.05);
  }
`}</style>

      <div className="content-area">
        <div className="text-center mb-4 mt-5">
          <h2 className="text-primary mb-5">Welcome to the Project Manager Dashboard!</h2>
        </div>

        <div className="row justify-content-center">
          {projects.map((project) => (
            <div className="col-md-4 mb-4" key={project.projectid}>
              <div className="card shadow-lg hover-card">
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
                    <select className="form-select btn btn-warning" aria-label="Default select example" onChange={handleTaskChange}>
                      <option value="">Select task issue</option>
                      {tasks.map((task) => (
                        <option key={task.id} value={task.id}>
                          {task.taskname}
                        </option>
                      ))}
                    </select>                
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProject && <ProjectsDetailsModel selectedProject={selectedProject} />}
    </div>
  );
};

export default ProjectManager;

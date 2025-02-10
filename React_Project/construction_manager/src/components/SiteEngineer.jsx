import { useNavigate } from "react-router-dom";
import { TaskInformationModel } from "./TaskInformationModel";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { useSelector } from "react-redux";
const SiteEngineer = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");
  const [alltasks, setAlltasks] = useState([]);

  const navigate = useNavigate();

  const navigateToRaiseIssue = (taskId) => {
    navigate(`/raiseIssue/${taskId}`);
  };


  
  const authState = useSelector((state) => state.auth);
  const userID = authState.user ? authState.user.uid : null;


  const fetchAllProject = () => {
    axios
      .get(`http://localhost:8170/crud/managed-by/${userID}`)
      .then((response) => {
        setAllProjects(response.data);
        console.log("Projects fetched:", response.data);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  };

  useEffect(() => {
    fetchAllProject();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchtaskByProjectId();
    }
  }, [selectedProject]);

  const fetchtaskByProjectId = () => {
    axios
      .get(`http://localhost:8170/crud/getAllTaskprojectbyId/${selectedProject}`)
      .then((response) => {
        console.log("Fetched tasks:", response.data);
        setAlltasks(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
  };

  useEffect(() => {
    if (selectedTask) {
      const modalElement = document.getElementById("taskInfoModal");
      if (modalElement) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }, [selectedTask]);

  return (
    <>
      <Navbar />
      <div className="text-center p-3 sticky-top">
        <h2 className="mb-4 text-primary mt-4">Welcome Site Engineer Dashboard!</h2>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-md-4">
            <label className="form-label fw-bold">Select Project</label>
            <select
              className="form-select"
              value={selectedProject}
              onChange={(e) => {
                setSelectedProject(e.target.value);
                console.log("Selected Project:", e.target.value);
              }}
            >
              <option value="">Select Project</option>
              {allProjects.map((project) => (
                <option key={project.projectid} value={project.projectid}>
                  {project.projectName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <h5 className="mb-3">Task Details</h5>
        <div className="row">
          {alltasks.length > 0 ? (
            alltasks.map((task) => (
              <div className="col-md-4 mb-3" key={task.taskid}>
                <div className="card shadow-lg">
                  <div className="card-body">
                    <h5 className="card-title">{task.taskname}</h5>
                    <p className="card-text">
                      <strong>Priority:</strong> {task.priority}
                    </p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleViewDetails(task)}
                      >
                        View Details
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => navigateToRaiseIssue(task.taskid)}
                      >
                        Raise Issue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted text-center">No tasks available</p>
          )}
        </div>
      </div>

      {selectedTask && <TaskInformationModel selectedTask={selectedTask} />}

      {/* CSS Inside JSX */}
      <style>{`
        body {
          background-color: #f7f9fc;
          font-family: 'Arial', sans-serif;
        }

        .heading {
          color: #ffffff;
          font-size: 2rem;
          font-weight: bold;
          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }

        .card {
          background: #ffffff;
          border: 1px solid #eaeaea;
          border-radius: 15px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }

        .card-title {
          color: #0056b3;
          font-weight: bold;
          font-family: auto;
        }

        .task-title {
          font-size: 1.2rem;
          color: #555555;
          font-family: system-ui;
        }

        /* Grid styles */
        .container {
          max-width: 1200px;
        }

        .row {
          display: flex;
          flex-wrap: wrap;
        }

        .col-md-4 {
          flex: 0 0 33.333%;
          max-width: 33.333%;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .col-md-4 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default SiteEngineer;

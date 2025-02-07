import { useNavigate } from "react-router-dom";
import "./SiteEngineer.css";
import { TaskInformationModel } from "./TaskInformationModel";
import axios from "axios";
import { useEffect, useState } from "react";

const SiteEngineer = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");
  const [alltasks, setAlltasks] = useState([]);

  const navigate = useNavigate();

  const navigateToRaiseIssue = (taskId) => {
    navigate(`/raiseIssue/${taskId}`);
  };

  const fetchAllProject = () => {
    axios
      .get("http://localhost:1111/api/getAllProject")
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
      .get(`http://localhost:1111/getAllTaskprojectbyId/${selectedProject}`)
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
      <div className="  text-center p-3 sticky-top">
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
    </>
  );
};

export default SiteEngineer;

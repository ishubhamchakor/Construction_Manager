import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Reports = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7159/api/reports")
      .then((response) => {
        console.log("API Response:", response.data); // Debugging API response
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data!", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary fw-bold">Project Reports</h2>
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Project Name</th>
              <th>Manager Name</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>
                  <div>{project.projectName || "N/A"}</div>
                  <div className="text-muted small">Project Name</div>
                </td>
                <td>
                  <div>{project.manager?.userName || "N/A"}</div>
                  <div className="text-muted small">Manager Name</div>
                </td>
                <td>
                  <div>
                    {project.startDate
                      ? new Date(project.startDate).toLocaleDateString()
                      : "N/A"}
                  </div>
                  <div className="text-muted small">Start Date</div>
                </td>
                <td>
                  <div>
                    {project.endDate
                      ? new Date(project.endDate).toLocaleDateString()
                      : "N/A"}
                  </div>
                  <div className="text-muted small">End Date</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-danger" onClick={() => navigate(-1)}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Reports;

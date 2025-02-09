import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectRegistration = ({ onClose, existingProject }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    managedBy: "",
    file: null,
  });

  const [managers, setManagers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8173/project-managers")
      .then((response) => setManagers(response.data))
      .catch(() => setErrorMessage("Failed to load project managers."));

    if (existingProject) {
      setFormData({
        name: existingProject.name || "",
        description: existingProject.description || "",
        startDate: existingProject.startDate || "",
        endDate: existingProject.endDate || "",
        managedBy: existingProject.managedBy?.id || "",
        file: null,
      });
    }
  }, [existingProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setValidationError(""); // Clear validation errors on input change
  };

  const handleManagerChange = (e) => {
    setFormData((prevData) => ({ ...prevData, managedBy: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    if (formData.startDate < today) {
      setValidationError("Start date must be today or later.");
      return;
    }

    if (formData.endDate < formData.startDate) {
      setValidationError("End date must be on or after the start date.");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("startDate", formData.startDate);
    form.append("endDate", formData.endDate);
    form.append("managedBy", formData.managedBy);

    try {
      const response = await axios.post("http://localhost:8173/api/newProject", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setSuccessMessage("Project registered successfully!");
        setErrorMessage("");
        setValidationError("");
      } else {
        throw new Error("Failed to register project");
      }
    } catch (error) {
      setErrorMessage("Error registering project: " + error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-4">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-3 text-primary">Register Project</h2>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {validationError && <div className="alert alert-warning">{validationError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Project Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              name="startDate"
              className="form-control"
              value={formData.startDate}
              min={new Date().toISOString().split("T")[0]} // Restrict past dates
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              name="endDate"
              className="form-control"
              value={formData.endDate}
              min={formData.startDate || new Date().toISOString().split("T")[0]} // Restrict past start date
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Managed By (Project Manager)</label>
            <select
              name="managedBy"
              className="form-control"
              value={formData.managedBy}
              onChange={handleManagerChange}
              required
            >
              <option value="">Select Manager</option>
              {managers.map((manager) => (
                <option key={manager.userID} value={manager.userID}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">File Attachment</label>
            <input type="file" name="file" className="form-control" onChange={handleFileChange} />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectRegistration;

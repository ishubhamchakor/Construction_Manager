import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Task = ({ baseURL, onClose }) => {
  const [taskData, setTaskData] = useState({
    taskName: "",
    description: "",
    startDate: "",
    dueDate: "",
    priority: "",
    status: "",
    assignedTo: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setTaskData({
      ...taskData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in taskData) {
      formData.append(key, taskData[key]);
    }

    try {
      await axios.post(`${baseURL}/tasks`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Task created successfully!");
      onClose(); // Hide the form after submitting
    } catch (error) {
      console.error("❌ Error creating task:", error);
    }
  };

  return (
    <section className="mt-4 p-4 bg-light border rounded">
      <h4 className="mb-4 text-center">📝 Create New Task</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Task Name:</label>
            <input
              type="text"
              className="form-control"
              name="taskName"
              value={taskData.taskName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Description:</label>
            <textarea
              className="form-control"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Start Date:</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={taskData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Due Date:</label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Priority:</label>
            <select
              className="form-control"
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select priority</option>
              <option value="high">🔥 High</option>
              <option value="medium">⚡ Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Status:</label>
            <select
              className="form-control"
              name="status"
              value={taskData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select status</option>
              <option value="beginning">🚀 Beginning</option>
              <option value="ongoing">🔄 Ongoing</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Assigned To:</label>
            <input
              type="text"
              className="form-control"
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={handleChange}
              required
              placeholder="Enter assignee name"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">File Attachment:</label>
            <input type="file" className="form-control" name="file" onChange={handleChange} />
          </div>
        </div>

        <div className="text-center mt-3">
          <button type="submit" className="btn btn-success btn-lg">📤 Submit Task</button>
          <button type="button" className="btn btn-secondary btn-lg ms-2" onClick={onClose}>❌ Clear</button>
        </div>
      </form>
    </section>
  );
};

export default Task;

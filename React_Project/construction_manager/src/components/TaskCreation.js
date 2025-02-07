import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const TaskCreation = () => {
    // React Router navigation
    const navigate = useNavigate();

    // State for task form data
    const [formData, setFormData] = useState({
        taskname: "",   // Task Name
        description: "", // Task Description
        startdate: "",
        duedate: "",
        priority: "",
        file: null,
    });

    // Handle input changes (text, date, and file inputs)
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value, // Handle file separately
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare FormData for file upload
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        });

        // ✅ Debugging: Log FormData Contents
        console.log("FormData contains:");
        for (let pair of data.entries()) {
            console.log(pair[0] + ": ", pair[1]);
        }

        try {
            // API request to create a new project
            await axios.post("http://localhost:8173/saveTask", data, {
                headers: { "Content-Type": "application/json" },
            });

            alert("Task created successfully!");
            navigate("/projectManager"); // Redirect after successful creation
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Failed to create task. Please try again.");
        }
    };

    return (
        <main className="container mt-5 border rounded shadow-lg bg-white p-5 col-8">
            <section className="registration">
                <h2 className="text-center mb-4 text-primary">Create Task</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">

                    {/* Task Name Input */}
                    <div className="form-group mb-3">
                        <label>Task Name:</label>
                        <input
                            type="text"
                            name="taskname"
                            className="form-control"
                            value={formData.taskname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div className="form-group mb-3">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            className="form-control"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    {/* Start Date Input */}
                    <div className="form-group mb-3">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="startdate"
                            className="form-control"
                            value={formData.startdate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Due Date Input */}
                    <div className="form-group mb-3">
                        <label>Deadline:</label>
                        <input
                            type="date"
                            name="duedate"
                            className="form-control"
                            value={formData.duedate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* File Upload Input */}
                    <div className="form-group mb-3">
                        <label>File Attachment:</label>
                        <input
                            type="file"
                            name="file"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>

                    {/* Priority Selection Dropdown */}
                    <div className="form-group mb-3">
                        <label>Priority:</label>
                        <select
                            name="priority"
                            className="form-control"
                            value={formData.priority}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Create Task</button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate("/projectManager")}>
                            Cancel
                        </button>
                    </div>

                </form>
            </section>
        </main>
    );
};

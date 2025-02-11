import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const TaskCreation = () => {
    const navigate = useNavigate();
    const projectid = useSelector((state) => state.project.projectId);

    const [formData, setFormData] = useState({
        taskname: "",
        description: "",
        startdate: "",
        duedate: "",
        priority: "",
        siteEngineerId: "",
        projectid: projectid,
    });

    const [siteEngineers, setSiteEngineers] = useState([]);

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        axios.get("http://localhost:8170/crud/users/site-engineers")
            .then(response => {
                setSiteEngineers(response.data);
            })
            .catch(error => console.error("Error fetching site engineers:", error));
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Additional validation before submitting
        if (formData.startdate < today) {
            alert("Start date cannot be before today.");
            return;
        }
        if (formData.duedate < formData.startdate) {
            alert("Due date cannot be before the start date.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8170/crud/saveTask", formData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200 || response.status === 201) {
                alert("Task created successfully!");
                navigate("/projectManager");
            } else {
                alert("Failed to create task. Please try again.");
            }
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Failed to create task. Please try again.");
        }
    };

    return (
        <main className="container mt-5 border rounded shadow-lg bg-white p-5 col-8">
            <section className="registration">
                <h2 className="text-center mb-4 text-primary">Create Task</h2>
                <form onSubmit={handleSubmit}>

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

                    <div className="form-group mb-3">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="startdate"
                            className="form-control"
                            value={formData.startdate}
                            min={today} // Ensures only today or future dates are selected
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>Deadline:</label>
                        <input
                            type="date"
                            name="duedate"
                            className="form-control"
                            value={formData.duedate}
                            min={formData.startdate || today} // Ensures only start date or future dates are selected
                            onChange={handleChange}
                            required
                        />
                    </div>

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

                    <div className="form-group mb-3">
                        <label>Assign Site Engineer:</label>
                        <select
                            name="siteEngineerId"
                            className="form-control"
                            value={formData.siteEngineerId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Site Engineer</option>
                            {siteEngineers.map(engineer => (
                                <option key={engineer.id} value={engineer.id}>
                                    {engineer.name}
                                </option>
                            ))}
                        </select>
                    </div>

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

import React, { useState } from 'react';
import axios from 'axios';

const Task = ({ onClose, projectId }) => {
    const [formData, setFormData] = useState({
        taskname: '',
        description: '',
        startdate: '',
        duedate: '',
        priority: '',
        status: '',
        assignedto: '',
        assignedby: '',
        fileattachment: null
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0] // Set the first file if multiple files are not supported
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        const task = {
            taskname: formData.taskname,
            description: formData.description,
            startdate: formData.startdate,
            duedate: formData.duedate,
            priority: formData.priority,
            status: formData.status,
            assignedto: formData.assignedto,
            assignedby: formData.assignedby,
            projectId: projectId
        };

        const formDataToSend = new FormData();
        formDataToSend.append('task', JSON.stringify(task));

        if (formData.fileattachment) {
            formDataToSend.append('fileattachment', formData.fileattachment);
        }

        try {
            const response = await axios.post('http://localhost:8173/SaveTask', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setSuccessMessage('Task created successfully!');
                setErrorMessage(''); // Clear any previous errors
            }
        } catch (error) {
            setSuccessMessage(''); // Clear any previous success messages
            setErrorMessage('Error creating task. Please try again.');
            console.error('Error creating task:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container">
            <h4>Create New Task</h4>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="taskname">Task Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="taskname"
                        name="taskname"
                        value={formData.taskname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="startdate">Start Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="startdate"
                        name="startdate"
                        value={formData.startdate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="duedate">Due Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="duedate"
                        name="duedate"
                        value={formData.duedate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        className="form-control"
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        required
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        className="form-control"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="assignedto">Assigned To</label>
                    <input
                        type="text"
                        className="form-control"
                        id="assignedto"
                        name="assignedto"
                        value={formData.assignedto}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="assignedby">Assigned By</label>
                    <input
                        type="text"
                        className="form-control"
                        id="assignedby"
                        name="assignedby"
                        value={formData.assignedby}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fileattachment">File Attachment</label>
                    <input
                        type="file"
                        className="form-control"
                        id="fileattachment"
                        name="fileattachment"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Submit Task
                </button>
                <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={onClose}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default Task;

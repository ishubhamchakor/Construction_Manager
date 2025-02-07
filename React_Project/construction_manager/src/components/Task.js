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
            projectId: projectId
        };

        const formDataToSend = new FormData();
        formDataToSend.append('task', JSON.stringify(task));

        if (formData.fileattachment) {
            formDataToSend.append('fileattachment', formData.fileattachment);
        }

        try {
            const response = await axios.post('http://localhost:1111/SaveTask', formDataToSend, {
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
        <main className="container mt-5 border rounded shadow-lg bg-white p-5 col-8">
            <section className="task-creation">
                <h2 className="text-center mb-4 text-primary">Create New Task</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Task Name:</label>
                            <input type="text" name="taskname" className="form-control" value={formData.taskname} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Priority:</label>
                            <select name="priority" className="form-control" value={formData.priority} onChange={handleChange} required>
                                <option value="">Select priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Start Date:</label>
                            <input type="date" name="startdate" className="form-control" value={formData.startdate} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Due Date:</label>
                            <input type="date" name="duedate" className="form-control" value={formData.duedate} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Status:</label>
                            <select name="status" className="form-control" value={formData.status} onChange={handleChange} required>
                                <option value="">Select status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">File Attachment:</label>
                            <input type="file" name="fileattachment" className="form-control" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description:</label>
                        <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleChange} required></textarea>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Create Task</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Task;

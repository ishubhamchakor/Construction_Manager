import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectTaskProject = ({ selectedProject, setShowModal, setSelectedTask }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (selectedProject?.projectid) {
            fetchTasksByProjectID(selectedProject.projectid);
        }
    }, [selectedProject]);

    const fetchTasksByProjectID = async (projectid) => {
        try {
            const response = await axios.get(`http://localhost:8170/crud/getAllTaskprojectbyId/${projectid}`);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleSelectedTaskChange = (e) => {
        const selectedTaskId = e.target.value;
        const task = tasks.find((t) => t.taskid.toString() === selectedTaskId);
        if (task) {
            setSelectedTask(task);
            setShowModal(true);
        }
    };

    return (
        <select className="form-select btn btn-warning" aria-label="Default select example" onChange={handleSelectedTaskChange}>
            <option value="">Select task issue</option>
            {tasks.map((task) => (
                <option key={task.taskid} value={task.taskid}>
                    {task.taskname}
                </option>
            ))}
        </select>
    );
};

export default SelectTaskProject;
import React from "react";

export const TaskInformationModel = ({ selectedTask }) => {
  if (!selectedTask) return null;

  return (
    <div
      className="modal fade"
      id="taskInfoModal"  
      tabIndex="-1"
      aria-labelledby="taskInfoModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          
          <div className="modal-header">
            <h5 className="modal-title" id="taskInfoModalLabel">
              {selectedTask.taskname}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          
          <div className="modal-body">
            <p><strong>Task Name :</strong> {selectedTask.taskname || "N/A"}</p>
            <p><strong>Description :</strong> {selectedTask.description || "No description available"}</p>
            <p><strong>startdate :</strong> {selectedTask.startdate || "N/A"}</p>
            <p><strong>Deadline  :</strong> {selectedTask.duedate || "N/A"}</p>
            <p><strong >priority  :</strong> <span className="badge rounded-pill bg-primary">{selectedTask.priority || "N/A"}</span></p>
            <p><strong>Description:</strong> {selectedTask.description || "No description available"}</p>
          </div>

          
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskShowModel = ({ setShowModal, selectedTask }) => {
  const [issue, setIssue] = useState([]);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchIssueRelatedTask(selectedTask.taskid);
  }, [issue]);

  const fetchIssueRelatedTask = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8170/crud/task_Issues/${id}`);
      console.log("Issue Data", response.data);
      setIssue(response.data);
    } catch (error) {
      console.error("Error fetching Issue:", error);
    }
  };

  return (
    <>
      {selectedTask && (
        <div className="modal fade show" style={{ display: "block" }} aria-modal="true" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Issue Details</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  {issue &&
                    issue.map((issue, index) => (
                      <div className="col-md-6 col-lg-4" key={index}>
                        <div className="card shadow-sm border-primary">
                          <div className="card-header bg-primary text-white">
                            <h6 className="card-title mb-0">{issue.issue_name}</h6>
                          </div>
                          <div className="card-body">
                            <p className="mb-0 text-muted"><strong>Description:</strong> {issue.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedTask && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default TaskShowModel;

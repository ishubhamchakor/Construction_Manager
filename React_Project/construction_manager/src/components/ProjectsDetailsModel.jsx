import React from 'react';

const ProjectsDetailsModel = ({ selectedProject }) => {

    const formatDate = (isoDate) => {
        if (!isoDate) return "N/A";
        return new Date(isoDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      };

  if (!selectedProject) return null;

  return (
    <div className="modal fade" id="taskInfoModal" tabIndex="-1" aria-labelledby="taskInfoModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="taskInfoModalLabel">
              {selectedProject.projectName}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p><strong>Project Name:</strong> {selectedProject.projectName || "N/A"}</p>
            <p><strong>Description:</strong> {selectedProject.description || "N/A"}</p>
            <p><strong>startDate:</strong> {formatDate(selectedProject.startDate) || "N/A"}</p>
            <p><strong>endDate:</strong> {formatDate(selectedProject.endDate) || "N/A"}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDetailsModel;

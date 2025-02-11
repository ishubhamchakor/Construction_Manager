import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const RaiseIssue = () => {
  const { id } = useParams(); // Get ID from URL params
  const navigate = useNavigate();

  const [issueData, setIssueData] = useState({
    issue_name: "",
    description: "",
  });

  // Set taskId when the component mounts or id changes


  const handleChange = (e) => {
    setIssueData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting issue data:", issueData);
    try {
      const response = await axios.post(`http://localhost:8170/crud/issues/${id}`, issueData);
      console.log("Response:", response.data);
      alert("Issue submitted successfully!"); // Success message
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("Failed to submit issue. Please try again."); // Error message
    }

    setIssueData({
      issue_name: "",
      description: "",
    });

  };

  return (
    <div className="container border mt-5 p-5 shadow-lg rounded w-50">
      <h3 className="text-center mb-4">Raise an Issue</h3>
      <form onSubmit={handleSubmit}>
        {/* Issue Name Field */}
        <div className="mb-3">
          <label htmlFor="issueName" className="form-label">
            Issue Name
          </label>
          <input
            type="text"
            className="form-control"
            id="issueName"
            placeholder="Enter issue name"
            name="issue_name"
            onChange={handleChange}
            value={issueData.issue_name}
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Provide a detailed description"
            name="description"
            onChange={handleChange}
            value={issueData.description}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Submit Issue
          </button>
          <button onClick={() => (
            navigate("/siteEngineer")
          )} className="btn btn-warning ">
            Back
          </button>
        </div>

      </form>
    </div>
  );
};

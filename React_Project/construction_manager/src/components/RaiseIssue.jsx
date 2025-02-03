export const RaiseIssue = () => {
  return (
    <><div className="container border mt-5 p-5 shadow-lg rounded w-50">
      <form>
        {/* Raised By Field */}
        <div className="mb-3">
          <label htmlFor="raisedBy" className="form-label">
            Raised By
          </label>
          <input
            type="text"
            className="form-control"
            id="raisedBy"
            placeholder="Enter your name"
          />
        </div>

        {/* Task ID Field */}
        <div className="mb-3">
          <label htmlFor="taskId" className="form-label">
            Task ID
          </label>
          <input
            type="text"
            className="form-control"
            id="taskId"
            placeholder="Enter task ID"
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
          ></textarea>
        </div>

        {/* Status Field */}
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select className="form-select" id="status">
            <option value="">Select status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>




    </>
  )
}

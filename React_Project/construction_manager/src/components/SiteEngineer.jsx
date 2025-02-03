
import { useNavigate } from "react-router-dom";
import "./SiteEngineer.css"

const SiteEngineer = () => {

  const tasks = [
    {
      id: 1,
      project: "Residential Tower A",
      location: "Sector 45, Gurgaon",
      task: "Supervise foundation work",
      deadline: "2025-01-15",
    },
    {
      id: 2,
      project: "Commercial Complex B",
      location: "Baner, Pune",
      task: "Coordinate plumbing installation",
      deadline: "2025-01-20",
    },
    {
      id: 3,
      project: "Industrial Park C",
      location: "Hinjawadi, Pune",
      task: "Oversee steel reinforcement",
      deadline: "2024-12-30",
    },
    {
      id: 4,
      project: "Luxury Villa Project D",
      location: "Whitefield, Bangalore",
      task: "Inspect electrical wiring installation",
      deadline: "2025-02-05",
    },
    {
      id: 5,
      project: "Mall Development E",
      location: "Salt Lake, Kolkata",
      task: "Monitor HVAC system setup",
      deadline: "2025-02-15",
    },
    {
      id: 6,
      project: "Corporate Office F",
      location: "Cyber City, Gurgaon",
      task: "Review structural framework",
      deadline: "2025-01-25",
    },
    {
      id: 7,
      project: "Affordable Housing G",
      location: "Hadapsar, Pune",
      task: "Check water supply line installation",
      deadline: "2025-01-30",
    },
    {
      id: 8,
      project: "Hotel Renovation H",
      location: "Connaught Place, Delhi",
      task: "Evaluate interior design changes",
      deadline: "2025-03-10",
    },
    {
      id: 9,
      project: "Metro Station I",
      location: "T. Nagar, Chennai",
      task: "Ensure platform leveling accuracy",
      deadline: "2025-03-20",
    },
    {
      id: 10,
      project: "Hospital Block J",
      location: "Banjara Hills, Hyderabad",
      task: "Inspect medical-grade piping installation",
      deadline: "2025-02-25",
    },
  ];


  const navigate = useNavigate();


  const navigateToRaiseIsuued = () => {
    navigate('/raiseIssue')
  }

  return (
    <>

      <div>
        <div className="bg-primary position-sticky sticky-top p-2 ">
          <h3 className="heading  text-center ">Welcome Site Engineer Page</h3>
        </div>

        <div className=" mt-5">
          <div className="row">
            {tasks &&
              tasks.map((task) => (
                <div className="col-md-4 mb-4 d-flex justify-content-center" key={task.id}>
                  <div className="card p-4 " style={{ width: "20rem", borderRadius: "15px" }}>
                    <h3 className="card-title text-center">{task.project}</h3>
                    <div className="card-body">
                      <h5 className="task-title">Task: {task.task}</h5>
                      <p>Location: {task.location}</p>
                      <p>Deadline: {task.deadline}</p>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-primary" onClick={navigateToRaiseIsuued}>Raised Issue</button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default SiteEngineer;

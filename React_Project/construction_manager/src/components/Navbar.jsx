import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react"; // Import Lucide React user icon
import { useDispatch } from "react-redux";
import { logout } from "../redux/Slice/authSlice"; // Import logout action

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear Redux state
    navigate("/login"); // Redirect to Login page
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg px-3">
        <div className="container-fluid">
          {/* Left side - Logo & Title */}
          <div className="d-flex align-items-center">
            <Link className="navbar-brand" to="#">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2YA3IL00IQgFsSwMXCidNfUMlz6XA0QnaPw&s"
                alt="Logo"
                width="70"
                height="70"
                className="d-inline-block align-text-top"
                style={{ mixBlendMode: "multiply" }}
              />
            </Link>
            <h3 className="mt-3 ms-2">Construction Manager</h3>
          </div>

          {/* Right side - Profile Dropdown */}
          <div className="ms-auto dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <User size={32} className="text-dark" /> {/* Profile Icon */}
            </a>

            {/* Dropdown Menu with Logout Option */}
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li>
                <button className="dropdown-item text-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

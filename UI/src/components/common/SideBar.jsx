import { useEffect } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  useEffect(() => {
    const toggleButton = document.querySelector(".toggle-sidebar-btn");
    const bodyElement = document.querySelector("body");

    const toggleSidebar = () => {
      bodyElement.classList.toggle("toggle-sidebar");
    };

    if (toggleButton) {
      toggleButton.addEventListener("click", toggleSidebar);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (toggleButton) {
        toggleButton.removeEventListener("click", toggleSidebar);
      }
    };
  }, []);

  return (
    <>
      <button className="toggle-sidebar-btn">Toggle Sidebar</button>{" "}
      {/* Add your toggle button here */}
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link " to="/">
              <i className="bi bi-grid "></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#teacher-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>Teacher</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="teacher-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/teacher-list">
                  <i className="bi bi-circle"></i>
                  <span>Teacher List</span>
                </Link>
              </li>
              <li>
                <Link to="/add-teacher">
                  <i className="bi bi-circle"></i>
                  <span>Add Teacher</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#student-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>Student</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="student-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/application-form">
                  <i className="bi bi-circle"></i>
                  <span>Application Form</span>
                </Link>
              </li>
              <li>
                <Link to="/student-list">
                  <i className="bi bi-circle"></i>
                  <span>Applications List</span>
                </Link>
              </li>
              <li>
                <Link to="/add-student">
                  <i className="bi bi-circle"></i>
                  <span>Add Student</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link collapsed"
              data-bs-target="#sponsor-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>Sponsor</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </Link>
            <ul
              id="sponsor-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/sponsor-list">
                  <i className="bi bi-circle"></i>
                  <span>Sponsor List</span>
                </Link>
              </li>
              <li>
                <Link to="/add-sponsor">
                  <i className="bi bi-circle"></i>
                  <span>Add Sponsor</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-heading">Pages</li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/attendance">
              <i className="bi bi-person"></i>
              <span>Attendance</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/academic">
              <i className="bi bi-person"></i>
              <span>Academic</span>
            </Link>
            <li className="nav-item">
            <Link className="nav-link collapsed" to="/adminstration">
              <i className="bi bi-gear"></i>
              <span>Admnistration</span>
            </Link>
          </li>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;

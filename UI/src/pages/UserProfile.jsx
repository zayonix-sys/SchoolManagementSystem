import { useState } from "react";
import { Link } from "react-router-dom";
import EditProfile from "../components/user/EditProfile";
import ProfileSetting from "../components/user/ProfileSetting";
import ChangePassword from "../components/user/ChangePassword";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile-overview");
  return (
    <div className="main" id="main">
      <div className="pagetitle">
        <h1>Profile</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">Users</li>
            <li className="breadcrumb-item active">Profile</li>
          </ol>
        </nav>
      </div>
      <section className="section profile">
        <div className="row">
          <div className="col-xl-4">
            <div className="card">
              <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                <img
                  src="assets/img/profile-img.jpg"
                  alt="Profile"
                  className="rounded-circle"
                />
                <h2>Kevin Anderson</h2>
                <h3>Web Designer</h3>
                <div className="social-links mt-2">
                  <Link to="#" className="twitter">
                    <i className="bi bi-twitter"></i>
                  </Link>
                  <Link to="#" className="facebook">
                    <i className="bi bi-facebook"></i>
                  </Link>
                  <Link to="#" className="instagram">
                    <i className="bi bi-instagram"></i>
                  </Link>
                  <Link to="#" className="linkedin">
                    <i className="bi bi-linkedin"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "profile-overview" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("profile-overview")}
                    >
                      Overview
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "profile-edit" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("profile-edit")}
                    >
                      Edit Profile
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "profile-settings" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("profile-settings")}
                    >
                      Settings
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "profile-change-password" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("profile-change-password")}
                    >
                      Change Password
                    </button>
                  </li>
                </ul>
                <div className="tab-content pt-2">
                  {activeTab === "profile-overview" && (
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-overview"
                    >
                      <h5 className="card-title">About</h5>
                      <p className="small fst-italic">
                        Sunt est soluta temporibus accusantium neque nam maiores
                        cumque temporibus. Tempora libero non est unde veniam
                        est qui dolor. Ut sunt iure rerum quae quisquam autem
                        eveniet perspiciatis odit. Fuga sequi sed ea saepe at
                        unde.
                      </p>

                      <h5 className="card-title">Profile Details</h5>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">
                          Full Name
                        </div>
                        <div className="col-lg-9 col-md-8">Kevin Anderson</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Company</div>
                        <div className="col-lg-9 col-md-8">
                          Lueilwitz, Wisoky and Leuschke
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Job</div>
                        <div className="col-lg-9 col-md-8">Web Designer</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Country</div>
                        <div className="col-lg-9 col-md-8">USA</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Address</div>
                        <div className="col-lg-9 col-md-8">
                          A108 Adam Street, New York, NY 535022
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Phone</div>
                        <div className="col-lg-9 col-md-8">
                          (436) 486-3538 x29071
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">
                          k.anderson@example.com
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "profile-edit" && (
                    <div
                      className="tab-pane fade show active profile-edit pt-3"
                      id="profile-edit"
                    >
                      <EditProfile />
                    </div>
                  )}
                  {activeTab === "profile-settings" && (
                    <div
                      className="tab-pane fade show active pt-3"
                      id="profile-settings"
                    >
                      <ProfileSetting />
                    </div>
                  )}
                  {activeTab === "profile-change-password" && (
                    <div
                      className="tab-pane fade show active pt-3"
                      id="profile-change-password"
                    >
                      <ChangePassword />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;

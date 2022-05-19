import React from 'react'
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { MdNotificationsActive } from "react-icons/md";
const NavBarDashboard = () => {
  return (
    <nav className="main-header navbar navbar-expand navbar-dark">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Navbar Search */}
        {/* Messages Dropdown Menu */}
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <IconContext.Provider value={{ color: "#fff", size: "20px" }}>
              <div style={{ marginBottom: "5px", marginRight: "-5px", display: "inline-block" }} className="nav-icon">
                <MdNotificationsActive />
              </div>
            </IconContext.Provider>
            {/* Count Data Notifikasi */}
            <span className="badge badge-danger navbar-badge">3</span>
            {/* End Count Data Notifikasi */}
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <Link href="#" className="dropdown-item">
              {/* Message Start */}
              <div className="media">
                <img src="assets/dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                <div className="media-body">
                  <h3 className="dropdown-item-title">
                    Brad Diesel
                    <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
                  </h3>
                  <p className="text-sm">Call me whenever you can...</p>
                  <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                </div>
              </div>
              {/* Message End */}
            </Link>
            <div className="dropdown-divider" />
            <Link href="#" className="dropdown-item">
              {/* Message Start */}
              <div className="media">
                <img src="assets/dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                <div className="media-body">
                  <h3 className="dropdown-item-title">
                    John Pierce
                    <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
                  </h3>
                  <p className="text-sm">I got your message bro</p>
                  <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                </div>
              </div>
              {/* Message End */}
            </Link>
            <div className="dropdown-divider" />
            <Link href="#" className="dropdown-item">
              {/* Message Start */}
              <div className="media">
                <img src="assets/dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                <div className="media-body">
                  <h3 className="dropdown-item-title">
                    Nora Silvester
                    <span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>
                  </h3>
                  <p className="text-sm">The subject goes here</p>
                  <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                </div>
              </div>
              {/* Message End */}
            </Link>
            <div className="dropdown-divider" />
            <Link href="#" className="dropdown-item dropdown-footer">See All Messages</Link>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link" data-widget="fullscreen" href="#" role="button">
            <i className="fas fa-expand-arrows-alt" />
          </a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
            <i className="fas fa-th-large" />
          </a>
        </li> */}
      </ul>
    </nav>
  )
}

export default NavBarDashboard

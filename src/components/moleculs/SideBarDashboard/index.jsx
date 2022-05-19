import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';
// icon
import { IconContext } from "react-icons";
import { GiCargoShip, GiTruck, GiSpeedometer, GiCommercialAirplane } from "react-icons/gi";
import { HiDocumentText } from 'react-icons/hi'
import { IoReceipt, IoDocumentAttach } from 'react-icons/io5'
import { FaUsersCog, FaWatchmanMonitoring } from 'react-icons/fa';
import { BsSpeedometer } from 'react-icons/bs'
import { ImExit } from 'react-icons/im'

// end icon
import { DropDownMenu, SingleMenu } from '../../atoms';
import { Link } from 'react-router-dom';
import CheckRoleContext from '../../../context/CheckRoleContext'
import CurrentAkunContext from '../../../context/CurrentAkunLoginContext'
import CheckLoginContext from '../../../context/CheckLoginContext'


const SideBarDashboard = () => {
  /* ----------------------------- AXIOS INSTANCE ----------------------------- */
  var axiosInstnce = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  })
  /* ----------------------------- END AXIOS INSTANCE ----------------------------- */

  useEffect(() => {
    CheckRoleData()
    GetCurrentAkun()
  }, [])

  const { checkRole, CheckRoleData } = useContext(CheckRoleContext)
  const { currentAkun, GetCurrentAkun } = useContext(CurrentAkunContext)

  const { GetLogin } = useContext(CheckLoginContext)

  const history = useHistory();

  // Menu DropDown
  let MenuAdminInput = [
    { id: 1, url: "/create-sp", title: "Buat Sp Baru" },
  ]
  let MenuUserManagement = [
    { id: 1, url: "/create-user", title: "Buat Admin Baru" },
  ]
  // end Menu DropDown

  const OnLogout = async (e) => {
    e.preventDefault()
    axiosInstnce.get('/logout-akun')
      .then(res => {
        console.log(res.status)
        if (res.status === 200) {
          Swal.fire(
            'Berhasil Logout',
            `${res.data.message}`,
            'success'
          );
          GetLogin()
          history.push('/')
        }
      }).catch(err => {
        console.log(err)
      })
  }


  return (
    <>


      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img src="assets/dist/img/logo-rms.gif" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">Sysmon RMS</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="info">
              <a href="#" className="d-block">{currentAkun.admin_name}</a>
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item menu-open">
                <Link to="/" className="nav-link active">
                  <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                    <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                      <GiSpeedometer />
                    </div>
                  </IconContext.Provider>
                  <p>
                    Dashboard
                  </p>
                </Link>
              </li>
              {checkRole == 2 && (
                <>
                  <li className="nav-item">
                    <Link to="/darat" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <GiTruck />
                        </div>
                      </IconContext.Provider>
                      <p>
                        Pengiriman Darat
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/monitoring-sp" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <FaWatchmanMonitoring />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Monitoring Sp
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                </>
              )}
              {checkRole === 3 && (
                <>
                  <li className="nav-item">
                    <Link to="/laut" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <GiCargoShip />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Pengiriman Laut
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/monitoring-sp" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <FaWatchmanMonitoring />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Monitoring Sp
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                </>
              )}

              {checkRole === 4 && (
                <>
                  <li className="nav-item">
                    <Link to="/udara" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <GiCommercialAirplane />
                        </div>
                      </IconContext.Provider>
                      <p>
                        Pengiriman Udara
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/monitoring-sp" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <FaWatchmanMonitoring />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Monitoring Sp
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                </>
              )}

              {checkRole === 7 && (
                <>
                  <li className="nav-item">
                    <Link to="/laut" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <GiCargoShip />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Pengiriman Laut
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/udara" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <GiCommercialAirplane />
                        </div>
                      </IconContext.Provider>
                      <p>
                        Pengiriman Udara
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/darat" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <GiTruck />
                        </div>
                      </IconContext.Provider>
                      <p>
                        Pengiriman Darat
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/data-spk" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <IoDocumentAttach />
                        </div>
                      </IconContext.Provider>
                      <p>
                        Data SPK
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/monitoring-sp" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <FaWatchmanMonitoring />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Monitoring Sp
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/monitoring-sp" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <FaWatchmanMonitoring />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Monitoring Sp
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                </>

              )}
              {/* <SingleMenu lable="Admin Dashboard" LinkMenu="/admin-input" icon={<BsSpeedometer />} /> */}
              {checkRole === 5 && (
                <>

                  <li className="nav-item">
                    <Link to="/monitoring-sp" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <FaWatchmanMonitoring />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Monitoring Sp
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/create-sp" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <HiDocumentText />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Admin Penginputan
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                </>
              )}
              {checkRole === 1 && (
                <>
                  <li className="nav-item">
                    <Link to="/laut" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <GiCargoShip />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Pengiriman Laut
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/udara" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <GiCommercialAirplane />
                        </div>
                      </IconContext.Provider>
                      <p>
                        Pengiriman Udara
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/darat" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <GiTruck />
                        </div>
                      </IconContext.Provider>
                      <p>
                        Pengiriman Darat
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/data-spk" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <IoDocumentAttach />
                        </div>
                      </IconContext.Provider>
                      <p>
                        Data SPK
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/monitoring-sp" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <FaWatchmanMonitoring />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Monitoring Sp
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/create-sp" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <HiDocumentText />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Admin Penginputan
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <DropDownMenu lable="User Management" icon={<FaUsersCog />} MenuArray={MenuUserManagement} />
                </>
              )}
              {checkRole === 6 && (
                <>
                  <li className="nav-item">
                    <Link to="/laut" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <GiCargoShip />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Pengiriman Laut
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/udara" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <GiCommercialAirplane />
                        </div>
                      </IconContext.Provider>
                      <p>
                        Pengiriman Udara
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/darat" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <GiTruck />
                        </div>
                      </IconContext.Provider>
                      <p>
                        Pengiriman Darat
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/data-spk" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <IoDocumentAttach />
                        </div>
                      </IconContext.Provider>
                      <p>
                        Data SPK
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/monitoring-sp" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <FaWatchmanMonitoring />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Monitoring Sp
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/create-sp" className="nav-link">
                      <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                          <HiDocumentText />
                        </div>
                      </IconContext.Provider>
                      {/* Main Sidebar Container */}
                      <p>
                        Admin Penginputan
                        {/* <span className="right badge badge-danger">New</span> */}
                      </p>
                    </Link>
                  </li>
                </>

              )}

              <button className="btn btn-danger btn-md" onClick={OnLogout}>
                <IconContext.Provider value={{ color: "#fff", size: "25px" }}>
                  <span className="nav-icon">
                    <ImExit />
                  </span>
                </IconContext.Provider>
                LOGOUT
              </button>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </>
  )
}

export default SideBarDashboard
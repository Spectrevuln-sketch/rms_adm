import React from 'react';
import { Link } from 'react-router-dom'
import { IconContext } from "react-icons";
import { FaUsersCog } from "react-icons/fa";

const DropDownMenu = ({ lable, icon, MenuArray }) => {
  return (
    <>
      {/* DropdownMenu */}

      <li className="nav-item">
        <Link to="#" className="nav-link">
          <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
            <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
              {icon}
            </div>
          </IconContext.Provider>
          <p>
            {lable}
            <i className="right fas fa-angle-left" style={{ marginTop: "5px" }} />
          </p>
        </Link>
        <ul className="nav nav-treeview " style={{ backgroundColor: "transparent" }}>
          {MenuArray && (

            MenuArray.map(menu => {
              return (

                <li className="nav-item" style={{ background: "transparent" }}>
                  <Link to={menu.url} className="nav-link active">
                    <i className="far fa-circle nav-icon" />
                    <p>{menu.title}</p>
                  </Link>
                </li>
              )
            })

          )}
        </ul>
      </li>
      {/*End DropdownMenu */}
    </>
  )
}

export default DropDownMenu

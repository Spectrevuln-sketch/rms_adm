import React from 'react'
import { Link } from 'react-router-dom'
import { IconContext } from "react-icons";

const SingleMenu = ({ lable, NotifBandage, LinkMenu, icon }) => {
    return (
        <>
            <li className="nav-item">
                <Link to={LinkMenu} className="nav-link">
                    <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
                        <div style={{ marginBottom: "5px", marginRight: "10px", display: "inline-block" }} className="nav-icon">
                            {icon}
                        </div>
                    </IconContext.Provider>
                    <p>
                        {lable}
                        {NotifBandage && (

                            <span className="right badge badge-danger">{NotifBandage}</span>
                        )}
                    </p>
                </Link>
            </li>
        </>
    )
}

export default SingleMenu

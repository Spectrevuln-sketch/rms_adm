import React, { useContext, useEffect, useState } from 'react'
import CustomerContext from '../../../context/CustomerContext'
import axios from 'axios'

const InputRoleDropdown = ({ label, ...rest }) => {
    const [role_user, setRoleUser] = useState([])

    /* ----------------------------- AXIOS INSTANCE ----------------------------- */
    var axiosInstnce = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    })
    /* ----------------------------- END AXIOS INSTANCE ----------------------------- */

    useEffect(() => {
        GetRole();
    }, [])
    const GetRole = async () => {
        await axiosInstnce.get('/get-user-role')
            .then(res => {
                setRoleUser(res.data)
            }).catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            <div class="form-group">
                <label>{label}</label>
                <select class="custom-select form-control-border text-uppercase" {...rest}>
                    <option>Pilih {label}...</option>
                    {role_user && (
                        role_user.map(op => (
                            <option value={op._id} className="text-uppercase" >{op.role_name}</option>

                        ))
                    )}
                </select>
            </div>
        </>
    )
}

export default InputRoleDropdown

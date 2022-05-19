
import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
const CheckRoleContext = createContext();

const CheckRoleContextProvider = (props) => {
    const [checkRole, setCheckRole] = useState(undefined);
    var axiosInstnce = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    })
    useEffect(() => {
        CheckRoleData();
    }, [])
    async function CheckRoleData() {
        const IsRole = await axiosInstnce.get('/check-role');
        setCheckRole(IsRole.data)
    }
    return (
        <CheckRoleContext.Provider value={{ checkRole, CheckRoleData }}>
            {props.children}
        </CheckRoleContext.Provider>
    )
}

export default CheckRoleContext;
export { CheckRoleContextProvider }
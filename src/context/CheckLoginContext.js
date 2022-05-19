
import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
const CheckLoginContext = createContext();

const CheckLoginContextProvider = (props) => {
    const [loggedin, setLoggedIn] = useState(undefined);
    var axiosInstnce = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    })
    useEffect(() => {
        GetLogin();
    }, [])
    const GetLogin = async () => {
        const IsLogin = await axiosInstnce.get('/islogin');
        setLoggedIn(IsLogin.data)
    }
    return (
        <CheckLoginContext.Provider value={{ loggedin, GetLogin }}>
            {props.children}
        </CheckLoginContext.Provider>
    )
}

export default CheckLoginContext;
export { CheckLoginContextProvider }

import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
const CurrentAkunContext = createContext();

const CurrentAkunContextProvider = (props) => {
    const [currentAkun, setCurrentAkun] = useState([]);
    var axiosInstnce = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    })
    useEffect(() => {
        GetCurrentAkun();
    }, [])
    async function GetCurrentAkun() {
        const CurrentAkunLoginData = await axiosInstnce.get('/current-akun');
        setCurrentAkun(CurrentAkunLoginData.data)
    }
    return (
        <CurrentAkunContext.Provider value={{ currentAkun, GetCurrentAkun }}>
            {props.children}
        </CurrentAkunContext.Provider>
    )
}

export default CurrentAkunContext;
export { CurrentAkunContextProvider }

import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
const ArmadaContext = createContext();

const ArmadaContextProvider = (props) => {
    const [allArmada, setallArmada] = useState([]);
    var axiosInstnce = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    })
    useEffect(() => {
        GetAllArmada();
    }, [])
    async function GetAllArmada() {
        const AllArmada = await axiosInstnce.get('/get-all-armada');
        setallArmada(AllArmada.data)
    }
    return (
        <ArmadaContext.Provider value={{ allArmada, GetAllArmada }}>
            {props.children}
        </ArmadaContext.Provider>
    )
}

export default ArmadaContext;
export { ArmadaContextProvider }
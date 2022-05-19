
import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
const SpContext = createContext();

const SpContextProvider = (props) => {
  const [allSPData, setallSPData] = useState([]);
  var axiosInstnce = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  })
  useEffect(() => {
    GetSpData();
  }, [])
  async function GetSpData() {
    const AllTask = await axiosInstnce.get('/get-all-data-sp');
    setallSPData(AllTask.data)
  }
  return (
    <SpContext.Provider value={{ allSPData, GetSpData }}>
      {props.children}
    </SpContext.Provider>
  )
}

export default SpContext;
export { SpContextProvider }
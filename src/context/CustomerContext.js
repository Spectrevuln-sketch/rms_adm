
import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
const CustomerContext = createContext();

const CustomerContextProvider = (props) => {
    const [allcustomer, setAllCustomer] = useState([]);
    var axiosInstnce = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    })
    useEffect(() => {
        GetAllCustomer();
    }, [])
    async function GetAllCustomer() {
        const AllCustomer = await axiosInstnce.get('/get-all-data-customer');
        setAllCustomer(AllCustomer.data)
    }
    return (
        <CustomerContext.Provider value={{ allcustomer, GetAllCustomer }}>
            {props.children}
        </CustomerContext.Provider>
    )
}

export default CustomerContext;
export { CustomerContextProvider }
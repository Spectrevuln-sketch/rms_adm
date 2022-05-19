import React, { useContext, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router';
import styled from 'styled-components'
import { CardFromHeader, InputForm, ButtonForm, InputDefault, InputGroupArmada, InputGroupCustomer } from '../../../components'
import SpContext from '../../../context/SPContext'

const ContainerForm = styled.div`
margin: 5vw 2vw 5vw 20vw
`;




const UpdateUdaraData = () => {
    /* ----------------------------- AXIOS INSTANCE ----------------------------- */
    var axiosInstnce = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    })
    /* ----------------------------- END AXIOS INSTANCE ----------------------------- */
    // context
    const { allSPData } = useContext(SpContext)


    // state
    const [no_sp, setNoSP] = useState('')
    const [via, setVia] = useState('')
    const [tanggal_sp, setTanggalSP] = useState('')
    const [customer_id, setCustomer] = useState('')



    const history = useHistory();

    const OnSubmitUdara = async (e) => {
        e.preventDefault()

    }
    return (
        <>
            {/* Horizontal Form */}
            <ContainerForm className="card card-info">
                <CardFromHeader label="Buat Data SP" />
                <form className="form-horizontal" onSubmit={OnSubmitUdara}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <InputDefault type="number" label="Nomor SP" name="no_sp" id="no_sp" onChange={(e) => setNoSP(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputGroupArmada label="Armada" onChange={(e) => setVia(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <InputGroupCustomer label="Customer" onChange={(e) => setCustomer(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <InputDefault type="date" label="Tanggal SP" name="tanggal_sp" id="tanggal_sp" onChange={(e) => setTanggalSP(e.target.value)} />
                            </div>
                        </div>
                        <ButtonForm type="submit" label="Submit" className="btn btn-primary mr-2" />
                        <ButtonForm type="button" label="Exit" className="btn btn-secondary ml-2" onClick={() => history.push('/darat')} />
                    </div>
                </form>
            </ContainerForm>
            {/* /.card */}
        </>
    )
}

export default UpdateUdaraData

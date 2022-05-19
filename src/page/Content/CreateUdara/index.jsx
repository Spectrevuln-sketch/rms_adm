import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { CardFromHeader, InputForm, ButtonForm, InputDefault } from '../../../components'
import SpContext from '../../../context/SPContext'

const ContainerForm = styled.div`
margin: 5vw 2vw 5vw 20vw
`;




const CreateUdara = () => {
    /* ----------------------------- AXIOS INSTANCE ----------------------------- */
    var axiosInstnce = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    })
    /* ----------------------------- END AXIOS INSTANCE ----------------------------- */
    // context
    const { sp_id } = useParams();

    // state
    const [nama_vendor, setNamaVendor] = useState('');
    const [nomor_smu, setNomorSmu] = useState('');
    const [ongkos_kirim, setOngkosKirim] = useState('');
    const [nama_bandara, setNamaBandara] = useState('');
    const [tanggal_eta, setEta] = useState('');
    const [tanggal_etd, setEtd] = useState('');
    const [nama_agen, setNamaAgen] = useState('');
    const [history_tujuan, setHistoryTujuan] = useState('')
    const [history_tanggal, setHistoryTanggal] = useState('')


    const history = useHistory();


    useEffect(() => {
        GetUdaraData()
    }, [])

    const GetUdaraData = async () => {

    }




    const OnSubmitUdara = async (e) => {
        e.preventDefault();
        await axiosInstnce.post('/update-udara-data', {
            sp_id,
            nama_vendor,
            nomor_smu,
            ongkos_kirim,
            nama_bandara,
            tanggal_eta,
            tanggal_etd,
            nama_agen,
            history_tujuan,
            history_tanggal
        }).then(res => {
            Swal.fire(
                'Berhasil',
                `${res.data.message}`,
                'success'
            )
            history.push(`/delivery-status/${sp_id}`)
        }).catch(err => {
            if (err) {
                if (err.response.status === 400) {
                    Swal.fire(
                        'Gagal Buat Data',
                        `${err.response.data.message}`,
                        'error'
                    )
                }
            }
        })
    }

    return (
        <>
            {/* Horizontal Form */}
            <ContainerForm className="card card-info">
                <CardFromHeader label="Buat Data Pengiriman Via Udara" />
                <form className="form-horizontal" onSubmit={OnSubmitUdara}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <InputDefault value={nama_vendor} type="text" label="Nama Vendor" name="nama_vendor" id="nama_vendor" onChange={(e) => setNamaVendor(e.target.value)} />
                                <InputDefault value={nomor_smu} type="number" label="Nomor SMU" name="nomor_smu" id="nomor_smu" onChange={(e) => setNomorSmu(e.target.value)} />
                                <InputDefault value={nama_agen} type="date" label="Nama Agen" name="nama_agen" id="nama_agen" onChange={(e) => setNamaAgen(e.target.value)} />
                                <InputDefault type="date" label="Tanggal Pengiriman" name="tanggal_pengiriman" id="tanggal_pengiriman" value={history_tanggal} onChange={(e) => setHistoryTanggal(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault value={ongkos_kirim} type="number" label="Ongkos Dooring" name="ongkos_kirim" id="ongkos_kirim" onChange={(e) => setOngkosKirim(e.target.value)} />
                                <InputDefault value={nama_bandara} type="text" label="Nama Bandara" name="nama_bandara" id="nama_bandara" onChange={(e) => setNamaBandara(e.target.value)} />
                                <InputDefault value={tanggal_eta} type="date" label="Tgl ETA" name="tanggal_eta" id="tanggal_eta" onChange={(e) => setEta(e.target.value)} />
                                <InputDefault value={tanggal_etd} type="date" label="Tgl ETD" name="tanggal_etd" id="tanggal_etd" onChange={(e) => setEtd(e.target.value)} />
                                <Link to={`/delivery-status/${sp_id}`} className="btn btn-success mt-5" style={{ width: '150px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>Delivery Status</Link>
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

export default CreateUdara

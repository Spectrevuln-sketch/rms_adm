import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { CardFromHeader, InputForm, ButtonForm, InputDefault } from '../../../components'
import SpContext from '../../../context/SPContext'
import Moment from 'moment'

const ContainerForm = styled.div`
margin: 5vw 2vw 5vw 20vw
`;




const CreateLaut = () => {
    /* ----------------------------- AXIOS INSTANCE ----------------------------- */
    var axiosInstnce = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    })
    /* ----------------------------- END AXIOS INSTANCE ----------------------------- */
    // context
    const { sp_id } = useParams();

    // state
    const [nama_pelayaran, setNamaPelayaran] = useState('');
    const [ongkos_kirim, setOngkosKirim] = useState('');
    const [nama_pelabuhan, setPelabuhan] = useState('');
    const [eta, setEta] = useState('');
    const [etd, setEtd] = useState('');
    const [nama_agen, setNamaAgen] = useState('');
    const [ongkos_dooring, setOngkosDor] = useState('');
    const [tanggal_diterima, setDiterima] = useState('');
    const [nama_penerima, setNamaPenerima] = useState('');
    const [ongkos_bongkar, setOngkosBongkar] = useState('');
    const [history_tujuan, setHistoryTujuan] = useState('')
    const [history_tanggal, setHistoryTanggal] = useState('')




    const history = useHistory();


    useEffect(() => {
        GetCurrentLaut()
    }, [])


    const GetCurrentLaut = async () => {
        await axiosInstnce.get(`/get-current-laut/${sp_id}`)
            .then(res => {
                if (res.status === 200) {
                    setNamaPelayaran(res.data.nama_pelayaran)
                    setOngkosKirim(res.data.ongkos_kirim)
                    setEta(Moment(res.data.eta).format('MM/DD/YYYY'))
                    setEtd(res.data.etd)
                    setNamaAgen(res.data.nama_agen)
                    setOngkosDor(res.data.ongkos_dooring)
                    setDiterima(res.data.tanggal_diterima)
                    setNamaPenerima(res.data.nama_penerima)
                    setOngkosBongkar(res.data.ongkos_bongkar)
                    setHistoryTanggal(res.data.tanggal_pengiriman)
                    setPelabuhan(res.data.nama_pelabuhan)

                }
            }).catch(err => {
                if (err) throw console.log(err)
            })
    }



    const OnSubmitLaut = async (e) => {
        e.preventDefault();
        await axiosInstnce.post('/update-laut-data', {
            sp_id,
            nama_pelayaran,
            ongkos_kirim,
            nama_pelabuhan,
            eta,
            etd,
            nama_agen,
            ongkos_dooring,
            tanggal_diterima,
            nama_penerima,
            ongkos_bongkar,
            history_tujuan,
            history_tanggal
        }).then(res => {
            if (res.status === 200) {
                Swal.fire(
                    'Berhasil',
                    `${res.data.message}`,
                    'success'
                )
                history.push(`/delivery-status/${sp_id}`)
            }
        }).catch(err => {
            if (err) {
                if (err.response !== undefined) {
                    if (err.response.status === 400) {
                        Swal.fire(
                            'Gagal',
                            `${err.response.data.message}`,
                            'error'
                        )
                    }
                }
            }
        })

    }

    return (
        <>
            {/* Horizontal Form */}
            <ContainerForm className="card card-info">
                <CardFromHeader label="Buat Data Pengiriman Via Laut" />
                <form className="form-horizontal" onSubmit={OnSubmitLaut}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <InputDefault value={nama_pelayaran} type="text" label="Nama Pelayaran" name="nama_pelayaran" id="nama_pelayaran" onChange={(e) => setNamaPelayaran(e.target.value)} />

                                <InputDefault value={nama_pelabuhan} type="text" label="Pelabuhan" name="nama_pelabuhan" id="nama_pelabuhan" onChange={(e) => setPelabuhan(e.target.value)} />
                                <InputDefault value={eta} type="date" label="Tgl ETA" name="eta" id="eta" onChange={(e) => setEta(e.target.value)} />
                                <InputDefault value={etd} type="date" label="Tgl ETD" name="etd" id="etd" onChange={(e) => setEtd(e.target.value)} />
                                <InputDefault value={history_tanggal} type="date" label="Tanggal Pengiriman" name="tanggal_pengiriman" id="tanggal_pengiriman" value={history_tanggal} onChange={(e) => setHistoryTanggal(e.target.value)} />
                                <InputDefault value={tanggal_diterima} type="date" label="Diterima" name="tanggal_diterima" id="tanggal_diterima" onChange={(e) => setDiterima(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault value={nama_penerima} type="text" label="Nama Penerima" name="nama_penerima" id="nama_penerima" onChange={(e) => setNamaPenerima(e.target.value)} />
                                <InputDefault value={ongkos_bongkar} type="number" label="Ongkos Bongkar" name="ongkos_bongkar" id="ongkos_bongkar" onChange={(e) => setOngkosBongkar(e.target.value)} />
                                <InputDefault value={ongkos_dooring} type="number" label="Ongkos Dooring" name="ongkos_dooring" id="ongkos_dooring" onChange={(e) => setOngkosDor(e.target.value)} />
                                <InputDefault value={nama_agen} type="text" label="Nama Agen" name="nama_agen" id="nama_agen" onChange={(e) => setNamaAgen(e.target.value)} />
                                <InputDefault value={ongkos_kirim} type="number" label="Ongkos Kirim" name="ongkos_kirim" id="ongkos_kirim" onChange={(e) => setOngkosKirim(e.target.value)} />
                                <Link to={`/delivery-status/${sp_id}`} className="btn btn-success mt-5" style={{ width: '150px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>Delivery Status</Link>
                            </div>
                            <div className="col-12">
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

export default CreateLaut

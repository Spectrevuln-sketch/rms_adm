import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components'
import { CardFromHeader, InputForm, ButtonForm, InputDefault } from '../../../components'
import SpContext from '../../../context/SPContext'
import { Link } from 'react-router-dom';

const ContainerForm = styled.div`
margin: 5vw 2vw 5vw 20vw
`;




const CreateDaratData = () => {
    /* ----------------------------- AXIOS INSTANCE ----------------------------- */
    var axiosInstnce = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    })
    /* ----------------------------- END AXIOS INSTANCE ----------------------------- */
    // context
    const { allSPData } = useContext(SpContext)
    const { sp_id } = useParams();

    // state
    const [identitas_armada, setIdentitasArmada] = useState('');
    const [nomor_kontrak, setNoKontrak] = useState('')
    const [ongkos_kirim_darat, setOngkosKirimDarat] = useState('');
    const [tanggal_eta, setEta] = useState('');
    const [tanggal_etd, setEtd] = useState('');
    const [tanggal_diterima, setTglDiterima] = useState('')
    const [nama_penerima, setNamaPenerima] = useState('')
    const [ongkos_dooring, setOngkosDooring] = useState('')
    const [agen_dooring, setAgen] = useState('')
    const [ongkos_bongkar, setOngkosBongkar] = useState('')
    const [history_tujuan, setHistoryTujuan] = useState('')
    const [history_tanggal, setHistoryTanggal] = useState('')
    const [hide, setHidden] = useState(true)




    const history = useHistory();

    useEffect(() => {
        GetDaratData()
    }, [])



    const GetDaratData = async () => {
        await axiosInstnce.get(`/get-current-darat/${sp_id}`)
            .then(res => {
                setIdentitasArmada(res.data.identitas_armada)
                setNoKontrak(res.data.nomor_kontrak)
                setOngkosKirimDarat(res.data.ongkos_kirim_darat)
                setEta(res.data.tanggal_eta)
                setEtd(res.data.tanggal_etd)
                setTglDiterima(res.data.tanggal_diterima)
                setNamaPenerima(res.data.nama_penerima)
                setOngkosDooring(res.data.ongkos_dooring)
                setAgen(res.data.agen_dooring)
                setOngkosBongkar(res.data.ongkos_dooring)
                setHistoryTanggal(res.data.history_pengiriman.length > 0 ? res.data.history_pengiriman.tanggal : '')
                setHistoryTujuan(res.data.history_pengiriman.length > 0 ? res.data.history_pengiriman.tujuan : '')
            }).catch(err => {
                console.log(err)
            })
    }

    const OnSubmitDarat = async (e) => {
        e.preventDefault();
        await axiosInstnce.post('/update-darat-data', {
            sp_id,
            identitas_armada,
            nomor_kontrak,
            ongkos_kirim_darat,
            tanggal_eta,
            tanggal_etd,
            tanggal_diterima,
            nama_penerima,
            ongkos_dooring,
            agen_dooring,
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
            if (err.response.status === 404) {
                Swal.fire(
                    'Gagal Buat Data',
                    `${err.response.data.message}`,
                    'error'
                )
            }
        })
    }

    return (

        <>
            {/* Horizontal Form */}
            <ContainerForm className="card card-info">
                <CardFromHeader label="Buat Data Pengiriman Via Darat" />
                <form className="form-horizontal" onSubmit={OnSubmitDarat}>
                    <div className="card-body">

                        <div className="row" >
                            <div className="col-6">
                                <InputDefault type="text" label="Identitas Armada" name="identitas_armada" id="identitas_armada" value={identitas_armada} onChange={(e) => setIdentitasArmada(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="number" label="Nomor Kontrak" name="nomor_kontrak" id="nomor_kontrak" value={nomor_kontrak} onChange={(e) => setNoKontrak(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="number" label="Ongkos Kirim" name="ongkos_kirim_darat" id="ongkos_kirim_darat" value={ongkos_kirim_darat} onChange={(e) => setOngkosKirimDarat(e.target.value)} />
                                <InputDefault type="date" label="Tanggal ETA" name="tanggal_eta" id="tanggal_eta" value={tanggal_eta} onChange={(e) => setEta(e.target.value)} />
                                <InputDefault type="date" label="Tanggal Diterima" name="tanggal_diterima" id="tanggal_diterima" value={tanggal_diterima} onChange={(e) => setTglDiterima(e.target.value)} />
                                <InputDefault type="text" label="Nama Penerima" name="nama_penerima" id="nama_penerima" value={nama_penerima} onChange={(e) => setNamaPenerima(e.target.value)} />
                                {/* <InputDefault type="text" label="Delivery Status" name="history_tujuan" id="history_tujuan" value={history_tujuan} onChange={(e) => setHistoryTujuan(e.target.value)} /> */}
                                <InputDefault type="date" label="Tanggal Pengiriman" name="tanggal_pengiriman" id="tanggal_pengiriman" value={history_tanggal} onChange={(e) => setHistoryTanggal(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="number" label="Ongkos Dooring" name="ongkos_dooring" id="ongkos_dooring" value={ongkos_dooring} onChange={(e) => setOngkosDooring(e.target.value)} />
                                <InputDefault type="date" label="Tanggal ETD" name="tanggal_etd" id="tanggal_etd" value={tanggal_etd} onChange={(e) => setEtd(e.target.value)} />
                                <InputDefault type="text" label="Agen Dooring" name="agen_dooring" id="agen_dooring" value={agen_dooring} onChange={(e) => setAgen(e.target.value)} />
                                <InputDefault type="text" label="Ongkos Bongkar" name="ongkos_bongkar" id="ongkos_bongkar" value={ongkos_bongkar} onChange={(e) => setOngkosBongkar(e.target.value)} />
                                <Link to={`/delivery-status/${sp_id}`} className="btn btn-success mt-5" style={{ width: '150px', display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>Delivery Status</Link>
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

export default CreateDaratData

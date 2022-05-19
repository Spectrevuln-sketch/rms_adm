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




const CreateSP = () => {
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
    const [nama_barang, setNamaBarang] = useState('')
    const [jumlah_barang, setJumlahBarang] = useState('')
    const [satuan, setSatuan] = useState('')
    const [kg, setKg] = useState('')
    const [packing, setPacking] = useState('')
    const [pickup, setPickup] = useState('')
    const [tanggal_pickup, setTglPick] = useState('')
    const [ops, setOps] = useState('')
    const [jenis_layanan, setJenisLayanan] = useState('')
    const [dead_line, setDeadline] = useState('')
    const [tujuan, setTujuan] = useState('')
    const [do_balik, setDoBalik] = useState('')



    const history = useHistory();

    const OnSubmitDarat = async (e) => {
        e.preventDefault()
        await axiosInstnce.post('/create-sp', {
            no_sp,
            tujuan,
            pengiriman_via: via,
            tanggal_sp,
            customer_id,
            jumlah_barang,
            satuan,
            kg,
            packing,
            pickup,
            tanggal_pickup,
            ops,
            jenis_layanan,
            dead_line,
            do_balik,
            nama_barang
        })
            .then(res => {
                if (res.status === 200) {
                    Swal.fire(
                        'Berhasil Login',
                        `${res.data.message}`,
                        'success'
                    )
                    history.go(0)
                }
            }).catch(err => {
                if (err.response !== undefined) {
                    if (err.response.status === 404) {
                        Swal.fire(
                            'Gagal Menyimpan !',
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
                <CardFromHeader label="Buat Data SP" />
                <form className="form-horizontal" onSubmit={OnSubmitDarat}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <InputDefault type="number" label="Nomor SP" name="no_sp" id="no_sp" onChange={(e) => setNoSP(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="text" label="Nama Barang" name="nama_barang" id="nama_barang" onChange={(e) => setNamaBarang(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="number" label="Jumlah Barang" name="jumlah_barang" id="jumlah_barang" onChange={(e) => setJumlahBarang(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="text" label="Satuan" name="satuan" id="satuan" onChange={(e) => setSatuan(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="text" label="kg" name="kg" id="kg" onChange={(e) => setKg(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="text" label="Packing" name="packing" id="packing" onChange={(e) => setPacking(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="text" label="Tempat Pickup" name="tempat_pickup" id="tempat_pickup" onChange={(e) => setPickup(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="date" label="Tanggal Pickup" name="tanggal_pickup" id="tanggal_pickup" onChange={(e) => setTglPick(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="text" label="Ops" name="oprational_name" id="oprational_name" onChange={(e) => setOps(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="text" label="Jenis Layanan" name="jenis_layanan" id="jenis_layanan" onChange={(e) => setJenisLayanan(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="date" label="Dead Line" name="dead_line" id="dead_line" onChange={(e) => setDeadline(e.target.value)} />
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
                            <div className="col-12">
                                <InputDefault type="text" label="Tujuan" name="tujuan" id="tujuan" onChange={(e) => setTujuan(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <InputDefault type="date" label="Do Balik" name="do_balik" id="do_balik" onChange={(e) => setDoBalik(e.target.value)} />
                            </div>
                        </div>
                        <ButtonForm type="submit" label="Submit" className="btn btn-primary mr-2" />
                        <ButtonForm type="button" label="Exit" className="btn btn-secondary ml-2" onClick={() => history.push("/admin-input")} />
                    </div>
                </form>
            </ContainerForm>
            {/* /.card */}
        </>
    )
}

export default CreateSP

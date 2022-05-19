import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router';
import styled from 'styled-components'
import { CardFromHeader, InputForm, ButtonForm, InputDefault, InputGroupArmada, InputGroupSp } from '../../../components'
import SpContext from '../../../context/SPContext'

const ContainerForm = styled.div`
margin: 5vw 2vw 5vw 20vw
`;




const CreateNewSpk = () => {
    /* ----------------------------- AXIOS INSTANCE ----------------------------- */
    var axiosInstnce = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    })
    /* ----------------------------- END AXIOS INSTANCE ----------------------------- */
    // context
    const { allSPData } = useContext(SpContext)


    // state
    const [pengiriman, setPengiriman] = useState('')
    const [pengembalian, setPengembalian] = useState('')
    const [no_sj, setNosj] = useState('')
    const [layanan, setLayanan] = useState('')
    const [due_date, setDueDate] = useState('')
    const [via, setVia] = useState('')
    const [biaya_kirim, setBiayaKirim] = useState('')
    const [sp_data, setSpData] = useState([])
    const [no_sp, setNoSp] = useState('')
    const [dikirim_melalui, setDikirimMelalui] = useState('')
    const [no_spk, setNoSpk] = useState('')
    const [kg, setKg] = useState('')
    const [koli, setKoli] = useState('')

    const history = useHistory();

    useEffect(() => {
        GetDataSp()
    }, [])

    const OnSubmitSpk = async (e) => {
        e.preventDefault();
        await axiosInstnce.post(`/create-spk/${no_sp}`, {
            pengiriman,
            pengembalian,
            no_sj,
            layanan,
            due_date,
            via,
            biaya_kirim,
            dikirim_melalui,
            no_spk,
            kg,
            koli
        }).then(res => {
            console.log(res.data)
            Swal.fire(
                'Berhasil !',
                `Berhasil Membuat Spk ${no_spk} !`,
                'success'
            )
        }).catch(err => {
            console.log(err)
        })
    }

    const GetDataSp = async () => {
        await axiosInstnce.get('/get-all-sp')
            .then(res => {
                if (res.status === 200) {
                    setSpData(res.data)
                }
            }).catch(err => {
                if (err) {

                    console.log(err)
                }
            })
    }

    return (
        <>
            {/* Horizontal Form */}
            <ContainerForm className="card card-info">
                <CardFromHeader label="Buat Data SP" />
                <form className="form-horizontal" onSubmit={OnSubmitSpk}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <InputDefault type="text" label="No. Spk" name="no_spk" id="no_spk" onChange={(e) => setNoSpk(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputGroupSp data_sp={sp_data} label="No.Sp" onChange={(e) => setNoSp(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="text" label="Customer" name="Customer" id="Customer" onChange={(e) => setPengiriman(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="text" label="Pengambilan & Tujuan" name="pengembalian_tujuan" id="pengembalian_tujuan" onChange={(e) => setPengembalian(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="number" label="No. SJ" name="no_sj" id="no_sj" onChange={(e) => setNosj(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="text" label="Jenis Layanan" name="jenis_layanan" id="jenis_layanan" onChange={(e) => setLayanan(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="date" label="Due Date" name="due_date" id="due_date" onChange={(e) => setDueDate(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputGroupArmada label="Armada" onChange={(e) => setVia(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="text" label="Dikirim Melaui" name="dikirim_melalui" id="dikirim_melalui" onChange={(e) => setDikirimMelalui(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="text" label="Biaya Kirim" name="biaya_kirim" id="biaya_kirim" onChange={(e) => setBiayaKirim(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="text" label="Kg " name="kg" id="kg" onChange={(e) => setKg(e.target.value)} />
                            </div>
                            <div className="col-6">
                                <InputDefault type="text" label="Koli " name="koli" id="koli" onChange={(e) => setKoli(e.target.value)} />
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

export default CreateNewSpk

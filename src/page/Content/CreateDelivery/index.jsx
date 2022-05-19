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




const CreateDelivery = () => {
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
    const [tanggal, setTanggal] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    // dynamic input
    const [DeliveryInput, setDeliveryInput] = useState([])




    const history = useHistory();

    useEffect(() => {
        GetHistoryData()
    }, [])



    const GetHistoryData = async () => {
        await axiosInstnce.get(`/get-current-sp/${sp_id}`)
            .then(res => {
                if (res.status === 200) {

                    setDeliveryInput(res.data.history_tujuan)
                }
            }).catch(err => {
                if (err.response !== undefined) {
                    console.log(err)
                }
            })
    }


    const AddNewDelivery = async (e) => {
        e.preventDefault()
        await axiosInstnce.post('/add-new-history', {
            sp_id,
            tanggal,
            deskripsi
        }).then(res => {
            Swal.fire(
                'Berhasil Menyimpan',
                `${res.data.message}`,
                'success'
            )
            GetHistoryData()
            console.log(DeliveryInput)
        }).catch(err => {
            if (err.response !== undefined) {

                Swal.fire(
                    'Gagal Menyimpan',
                    `${err.response.data.message}`,
                    'error'
                )
            }
        })
    }

    const DeleteHistory = async ({ history_id }) => {
        await axiosInstnce.delete(`/delete-history/${sp_id}/${history_id}`)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire(
                        'Sukses Menyimpan',
                        `${res.data.message}`,
                        'error'
                    )
                    GetHistoryData()
                }
            }).catch(err => {
                if (err.response !== undefined) {
                    Swal.fire(
                        'Gagal Menyimpan',
                        `${err.response.data.message}`,
                        'error'
                    )
                }
            })
    }


    const DelateManyHistory = async () => {

        Swal.fire({
            title: 'Apakah Anda Yakin?',
            text: "Apakah Anda Yakin Ingin Delete Semua History!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete !'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstnce.delete(`/delete-all-history/${sp_id}`)
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire(
                                'Sukses Menyimpan',
                                `${res.data.message}`,
                                'error'
                            )
                            GetHistoryData()
                        }
                    }).catch(err => {
                        if (err.response !== undefined) {
                            Swal.fire(
                                'Gagal Menyimpan',
                                `${err.response.data.message}`,
                                'error'
                            )
                        }
                    })
            }
        })

    }


    return (

        <>
            {/* Horizontal Form */}
            <ContainerForm className="card card-danger" style={{ width: 'fit-content' }}>
                <CardFromHeader label="Delivery Status" />
                <div className="card-body">

                    {DeliveryInput.length > 0 && (
                        DeliveryInput.map((data, idx) => {
                            return (

                                <div className='d-flex flex-row justify-content-start align-items-center'>
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <div className="d-flex flex-column">
                                            <InputDefault key={idx} readonly type='date' style={{ fontWeight: '200' }} label="Tanggal Status" name="tanggal" id="tanggal" value={data.tanggal} />
                                        </div>
                                        <div className="d-flex flex-column">
                                            <InputDefault key={idx} readonly type='text' label="Deskripsi Status" name="deskripsi" id="deskripsi" value={data.deskripsi} />
                                        </div>
                                        <button className="mt-3 btn btn-danger d-flex align-items-center" onClick={() => DeleteHistory({ history_id: data._id })}>
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            )

                        })
                    )}

                    <div className="d-flex flex-row justify-content-start align-items-center">
                        <div className="flex-row">
                            <InputDefault type="date" style={{ fontWeight: '200' }} label="Tanggal Status" name="Tanggal Status" id="tanggal" onChange={(e) => setTanggal(e.target.value)} />
                        </div>
                        <div className="flex-row">
                            <InputDefault type="text" label="Deskripsi Status" name="deskripsi" id="deskripsi" onChange={(e) => setDeskripsi(e.target.value)} />
                        </div>
                        <button type="button" className='mt-3 btn btn-primary btn-sm flex-column align-items-center justify-content-center' onClick={AddNewDelivery}>Tambah Data</button>
                    </div>
                </div>
            </ContainerForm>
            {/* /.card */}
        </>
    )
}

export default CreateDelivery

import React, { useContext, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router';
import styled from 'styled-components'
import { CardFromHeader, InputForm, ButtonForm, InputDefault, InputRoleDropdown } from '../../../components'
import SpContext from '../../../context/SPContext'

const ContainerForm = styled.div`
margin: 5vw 2vw 5vw 20vw
`;




const CreateNewAdmin = () => {
    /* ----------------------------- AXIOS INSTANCE ----------------------------- */
    var axiosInstnce = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    })
    /* ----------------------------- END AXIOS INSTANCE ----------------------------- */
    // context
    const { allSPData } = useContext(SpContext)


    // state
    const [admin_name, setNama] = useState('')
    const [admin_email, setEmail] = useState('')
    const [admin_password, setPassword] = useState('')
    const [current_password, setCurrentPassword] = useState('')
    const [admin_role, setRole] = useState('')




    const history = useHistory();

    const OnSubmitAdmin = async (e) => {
        e.preventDefault()
        await axiosInstnce.post('/register-admin', {
            admin_name,
            admin_email,
            admin_role,
            admin_password,
            current_password
        }).then(res => {
            if (res.status === 200) {
                if (res.status === 200) {
                    Swal.fire(
                        'Berhasil Tambah Data !',
                        `${res.data.message}`,
                        'success'
                    )
                    history.go(0)
                }
            }
        }).catch(err => {
            if (err.response !== undefined) {
                if (err.response.status === 403) {
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
                <CardFromHeader label="Buat Data Admin" />
                <form className="form-horizontal" onSubmit={OnSubmitAdmin}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <InputDefault type="text" label="Name" onChange={(e) => setNama(e.target.value)} />
                                <InputDefault type="email" label="Email" onChange={(e) => setEmail(e.target.value)} />
                                <InputDefault type="password" label="Password" onChange={(e) => setPassword(e.target.value)} />
                                <InputDefault type="password" label="Confrim Password" onChange={(e) => setCurrentPassword(e.target.value)} />
                                <div className="col-12">
                                    <InputRoleDropdown label="Role" onChange={(e) => setRole(e.target.value)} />
                                </div>
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

export default CreateNewAdmin

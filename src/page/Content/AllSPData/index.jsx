import React, { useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { TableSP } from '../../../components';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import axios from 'axios';
import Swal from 'sweetalert2'
const AllSpData = () => {
    const [dataLaut, setDataLaut] = useState([])
    /* ----------------------------- AXIOS INSTANCE ----------------------------- */
    var axiosInstnce = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    })
    /* ----------------------------- END AXIOS INSTANCE ----------------------------- */
    useEffect(() => {
        DataPengirimanLaut()
    }, [])

    const DataPengirimanLaut = async () => {
        await axiosInstnce.get('/get-all-laut')
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    setDataLaut(res.data)
                }
            }).catch(err => {
                if (err) {
                    if (err.response.status === 403) {
                        Swal.fire(
                            'Gagal Login',
                            `${err.response.data.message}`,
                            'success'
                        )
                    }
                }
            })
    }

    const DeleteData = async ({ e, data }) => {
        e.preventDefault()
        await axiosInstnce.delete('/delete-laut-data', {

        }).then(res => {

        }).catch(err => {

        })
    }

    const EditData = async ({ e, data }) => {
        await history.push(`/update-laut/${data}`)
    }



    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            ...columns,
            {
                id: "Action",
                Header: "Action",
                Cell: ({ row }) => (
                    <>
                        <button onClick={() => EditData({ data: row.values._id })} className="btn btn-warning">
                            Edit
                        </button>
                        <button onClick={() => DeleteData({ data: row.values._id })} className="btn btn-danger">
                            Delete
                        </button>
                    </>
                ),
            },

        ]);
    };

    const DataApi = useMemo(() => [...dataLaut], [dataLaut])
    const Coloms = useMemo(() =>
        dataLaut[0] ?
            Object.keys(dataLaut[0])
                .map(key => {
                    return { Headers: key, accessor: key }
                })
            : [],
        [dataLaut])

    const breadcrumbs = useBreadcrumbs();
    const history = useHistory();
    return (
        <>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Pengiriman Laut</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    {breadcrumbs.map(({ match, breadcrumb }) => (
                                        <li className={match.url ? "breadcrumb-item active" : "breadcrumb-item"} onClick={(e) => { history.push(match.url) }}>{breadcrumb}</li>
                                    ))}
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">

                        {/* Table Surat pengiriman */}
                        <TableSP data={DataApi} column={Coloms} tableHooks={tableHooks} />
                        {/* End Table Surat pengiriman */}

                    </div>{/*/. container-fluid */}
                </section>
                {/* /.content */}
            </div>
            {/* /.content-wrapper */}
        </>
    )
}

export default AllSpData

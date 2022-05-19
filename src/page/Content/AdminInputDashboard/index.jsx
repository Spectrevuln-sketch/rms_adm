import React, { useContext, useMemo } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { TableSP } from '../../../components';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import SpContext from '../../../context/SPContext'
import CustomerContext from '../../../context/CustomerContext'
import moment from 'moment'

const AdminInputDashboard = () => {
    const { allSPData } = useContext(SpContext)
    const { allcustomer } = useContext(CustomerContext)
    const breadcrumbs = useBreadcrumbs();
    const history = useHistory();



    console.log(allSPData)

    const DataApi = useMemo(() => [...allSPData], [allSPData])
    const Coloms = useMemo(() =>
        allSPData[0] ?
            Object.keys(allSPData[0])
                .filter((key) => key !== "data_sp" && key !== '__v' && key !== '_id')
                .map(key => {
                    console.log(key)
                    if (key === 'customer_id') {
                        return {
                            id: "customer",
                            Header: 'Customer',
                            accessor: `${key}.customer_name`
                        }

                    }

                    if (key === 'pengiriman_via') {
                        return {
                            Header: 'Via',
                            accessor: `${key}.via`
                        }
                    }
                    if (key === "no_sp") {
                        return {
                            id: "no_sp",
                            Header: 'No SP',
                            accessor: `${key}.no_sp`
                        }
                    }
                    if (key === "tanggal_sp") {
                        return {
                            Header: 'Tanggal Dibuat',
                            accessor: key,
                            Cell: ({ value }) => {
                                return (
                                    moment(value).format("DD-MM-YYYY")
                                )
                            }


                        }
                    }
                    return { Header: key, accessor: key }
                })
            : [],
        [allSPData])



    return (
        <>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Dashboard</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    {breadcrumbs.map(({ match, breadcrumb }) => (
                                        <li className={match.url ? "breadcrumb-item active" : "breadcrumb-item"} onClick={(e) => { history.push(match.url) }}>{breadcrumb}</li>
                                    ))}
                                    {/* <li className="breadcrumb-item active"></li> */}
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">

                        {/* Info boxes */}
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-4">
                                <div className="info-box mb-3">
                                    <span className="info-box-icon bg-danger elevation-1"><i class="fas fa-truck-loading" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">On Progress</span>
                                        <span className="info-box-number">2,000</span>
                                    </div>
                                    {/* /.info-box-content */}
                                </div>
                                {/* /.info-box */}
                            </div>
                            <div className="col-12 col-sm-12 col-md-4">
                                <div className="info-box">
                                    <span className="info-box-icon bg-info elevation-1"><i class="fas fa-folder-open" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Dokumen Balik</span>
                                        <span className="info-box-number">
                                            10
                                            <small>%</small>
                                        </span>
                                    </div>
                                    {/* /.info-box-content */}
                                </div>
                                {/* /.info-box */}
                            </div>
                            {/* /.col */}

                            {/* /.col */}
                            {/* fix for small devices only */}
                            <div className="clearfix hidden-md-up" />

                            {/* /.col */}
                            <div className="col-12 col-sm-6 col-md-4">
                                <div className="info-box mb-3">
                                    <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Customers</span>
                                        <span className="info-box-number">{allcustomer && (allcustomer.length)}</span>
                                    </div>
                                    {/* /.info-box-content */}
                                </div>
                                {/* /.info-box */}
                            </div>
                            {/* /.col */}

                            {/* /.col */}
                        </div>

                        {/* Main row */}
                        {/* Table Surat pengiriman */}
                        <TableSP data={DataApi} column={Coloms} ButtonCreateCustomer={true} />
                        {/* End Table Surat pengiriman */}

                    </div>{/*/. container-fluid */}
                </section>
                {/* /.content */}
            </div>
            {/* /.content-wrapper */}
        </>
    )
}

export default AdminInputDashboard

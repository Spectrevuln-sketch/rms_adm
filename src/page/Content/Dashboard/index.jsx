import React, { useContext, useMemo, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { TableSP } from '../../../components';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import CustomerContext from '../../../context/CustomerContext'
import SpContext from '../../../context/SPContext'
import Swal from 'sweetalert2'
import axios from 'axios'
const Dashboard = () => {
  const [count_do, setNotDo] = useState()
  const { allcustomer, GetAllCustomer } = useContext(CustomerContext)
  const { allSPData, GetSpData } = useContext(SpContext)
  const breadcrumbs = useBreadcrumbs();
  const history = useHistory();

  /* ----------------------------- AXIOS INSTANCE ----------------------------- */
  var axiosInstnce = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  })
  /* ----------------------------- END AXIOS INSTANCE ----------------------------- */


  useEffect(() => {
    GetSpData()
  }, [])


  const dataSp = () => {
    var length = 0;
    if (allSPData) {
      for (var key in allSPData) {
        if (allSPData.hasOwnProperty(key) === "do_balik") {
          ++length;
        }

      }
      return length
    }
  }

  const DeleteData = async ({ data }) => {
    Swal.fire({
      title: 'Apakah Anda Yakin?',
      text: "Apakah Anda Yakin Ingin Delete Data Ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete !'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstnce.delete(`/delete-customer/${data}`, {
          data: {
            laut_id: data
          }
        }).then(res => {
          if (res.status === 200) {
            Swal.fire(
              'Deleted!',
              `${res.data.message}`,
              'success'
            )
            GetAllCustomer()
            GetSpData()
            history.go(0)
          }
        }).catch(err => {
          if (err) {
            if (err.response.status === 400) {
              Swal.fire(
                'Error!',
                `${err.response.data.message}`,
                'error'
              )
            }
          }
        })
      }
    })
  }



  // react-table
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Action",
        Header: "Action",
        Cell: ({ row }) => (
          <>
            <button onClick={() => DeleteData({ data: row.values._id })} className="btn btn-danger">
              Delete
            </button>
          </>
        ),
      },

    ]);
  };

  const DataApi = useMemo(() => [...allcustomer], [allcustomer])
  const Coloms = useMemo(() =>
    allcustomer[0] ?
      Object.keys(allcustomer[0])
        .map(key => {
          if (key === 'customer_name') {
            return {
              Headers: 'Customer',
              accessor: key
            }
          }

          return { Headers: key, accessor: key }
        })
      : [],
    [allcustomer])


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
                  <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-truck-loading" /></span>
                  <div className="info-box-content">
                    <span className="info-box-text">On Progress</span>
                    <span className="info-box-number">{allSPData && (allSPData.length)}</span>
                  </div>
                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
              <div className="col-12 col-sm-12 col-md-4">
                <div className="info-box">
                  <span className="info-box-icon bg-info elevation-1"><i className="fas fa-folder-open" /></span>
                  <div className="info-box-content">
                    <span className="info-box-text">Dokumen Balik</span>
                    <span className="info-box-number">
                      {allSPData && (
                        dataSp()
                      )}
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
            {/* /.row */}
            {/* Main row */}
            {/* Table Surat pengiriman */}
            <TableSP data={DataApi} column={Coloms} tableHooks={tableHooks} ButtonCreateCustomer={true} />
            {/* End Table Surat pengiriman */}

          </div>{/*/. container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </>
  )
}

export default Dashboard

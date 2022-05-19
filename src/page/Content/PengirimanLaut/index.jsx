import React, { useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { TableSP } from '../../../components';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import axios from 'axios';
import Swal from 'sweetalert2'
import Moment from 'moment'
const PengirimanLaut = () => {
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
    await axiosInstnce.get('/get-laut-sp')
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          setDataLaut(res.data)
        }
      }).catch(err => {
        console.log(err)
      })
  }

  const DeleteData = async ({ data }) => {
    // e.preventDefault();
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
        axiosInstnce.delete('/delete-laut-data', {
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
            DataPengirimanLaut()
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
            <button onClick={() => EditData({ data: row.values.no_sp })} className="btn btn-warning">
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
          if (key === 'no_sp') {
            return { Header: 'No SP', accessor: key }
          }
          if (key === 'tanggal_sp') {
            return {
              Header: 'Tgl SP',
              accessor: (originalRow) => {
                return originalRow.tanggal_sp ? Moment(originalRow.tanggal_sp).format("DD-MM-YYYY") : originalRow.tanggal_sp
              }
            }
          }
          if (key === 'customer') {
            return {
              Header: 'Customer',
              accessor: (originalRow) => {
                return <p className="text-uppercase">{originalRow.customer}</p>
              }
            }
          }
          if (key === 'nama_pelayaran') {
            return { Header: 'Pelayaran', accessor: key }
          }
          if (key === 'ongkos_kirim') {
            return { Header: 'Ongkos Kirim', accessor: key }
          }
          if (key === 'nama_pelabuhan') {
            return { Header: 'Pelabuhan', accessor: key }
          }
          if (key === 'tanggal_eta') {
            return {
              Header: 'ETA',
              accessor: (originalRow) => {
                return originalRow.tanggal_eta ? Moment(originalRow.tanggal_eta).format("DD-MM-YYYY") : originalRow.tanggal_eta
              }
            }
          }
          if (key === 'tanggal_etd') {
            return {
              Header: 'ETD',
              accessor: (originalRow) => {
                return originalRow.tanggal_etd ? Moment(originalRow.tanggal_etd).format("DD-MM-YYYY") : originalRow.tanggal_etd
              }
            }
          }


          if (key === 'nama_agen') {
            return { Header: 'Agen', accessor: key }
          }
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

export default PengirimanLaut

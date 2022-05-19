import React, { useState, useEffect, useMemo } from 'react'
import { useGlobalFilter, useSortBy, useTable, usePagination } from "react-table";
import { useHistory } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { TableSP } from '../../../components';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import axios from 'axios';
import Swal from 'sweetalert2'
import Moment from 'moment'
import './pengiriman-darat.css'
const PengirimanDarat = () => {
  const [spDarat, setSpDarat] = useState([])
  /* ----------------------------- AXIOS INSTANCE ----------------------------- */
  var axiosInstnce = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  })
  /* ----------------------------- END AXIOS INSTANCE ----------------------------- */
  /* ----------------------------- STATE VARIABLE ----------------------------- */
  const breadcrumbs = useBreadcrumbs();
  const history = useHistory();

  useEffect(() => {
    SpDaratData()

  }, [])

  const SpDaratData = async () => {
    await axiosInstnce.get('/get-darat-sp')
      .then(res => {
        if (res.status === 200) {
          setSpDarat(res.data)

        }
      })
      .catch(err => {
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
        axiosInstnce.delete('/delete-darat-data', {
          data: {
            darat_id: data
          }
        }).then(res => {
          if (res.status === 200) {
            Swal.fire(
              'Deleted!',
              `${res.data.message}`,
              'success'
            )
            SpDaratData()
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
    await history.push(`/create-darat/${data}`)
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






  const DataApi = useMemo(() => [...spDarat], [spDarat])
  const Coloms = useMemo(() =>
    spDarat[0] ?
      Object.keys(spDarat[0])
        .map(key => {

          if (key === 'no_sp') {
            return { Header: 'No SP', accessor: key }
          }
          if (key === 'identitas_armada') {
            return { Header: 'Identitas', accessor: key }
          }
          if (key === 'nomor_kontrak') {
            return { Header: 'No Kontrak', accessor: key }
          }
          if (key === 'ongkos_kirim_darat') {
            return { Header: 'Ongkos Kirim', accessor: key }
          }
          if (key === 'tanggal_eta') {
            return {
              Header: 'ETA',
              accessor: (originalRow) => {
                return originalRow.tanggal_et ? Moment(originalRow.tanggal_eta).format("DD-MM-YYYY") : originalRow.tanggal_et
              }
            }
          }
          if (key === 'tanggal_etd') {
            return {
              Header: 'ETD',
              accessor: (originalRow) => {
                return originalRow.tanggal_eta ? Moment(originalRow.tanggal_eta).format("DD-MM-YYYY") : originalRow.tanggal_eta
              }
            }
          }
          if (key === 'agen_dooring') {
            return { Header: 'Agen', accessor: key }
          }
          if (key === 'ongkos_dooring') {
            return { Header: 'Ongkos Dooring', accessor: key }
          }
          if (key === 'nama_penerima') {
            return { Header: 'Nama Penerima', accessor: key }
          }
          if (key === 'ongkos_bongkar') {
            return { Header: 'Ongkos Bongkar', accessor: key }
          }
          if (key === 'tanggal_diterima') {
            return {
              Header: 'Tgl Diterima',
              accessor: (originalRow) => {
                return originalRow.tanggal_diterima ? Moment(originalRow.tanggal_diterima).format("DD-MM-YYYY") : originalRow.tanggal_diterima
              }
            }
          }
          if (key === 'tanggal_sp') {
            return {
              Header: 'Tanggal SP',
              accessor: (originalRow) => {
                return originalRow.tanggal_sp ? Moment(originalRow.tanggal_sp).format("DD-MM-YYYY") : originalRow.tanggal_sp
              }
            }
          }
          if (key === 'data_dibuat') {
            return {
              Header: 'Data dibuat',
              accessor: (originalRow) => {
                return originalRow.data_dibuat ? Moment(originalRow.data_dibuat).format("DD-MM-YYYY") : originalRow.data_dibuat
              }
            }
          }
          if (key === 'data_diupdate') {
            return {
              Header: 'Data diupdate',
              accessor: (originalRow) => {
                return originalRow.data_diupdate ? Moment(originalRow.data_diupdate).format("DD-MM-YYYY") : originalRow.data_diupdate
              }
            }
          }
          return { Header: key, accessor: key }
        })
      : [],
    [spDarat])

  return (
    <>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Pengiriman Darat</h1>
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
            <TableSP data={DataApi} column={Coloms} tableHooks={tableHooks} CreateURL="/create-darat" />
            {/* End Table Surat pengiriman */}

          </div>{/*/. container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </>
  )
}

export default PengirimanDarat

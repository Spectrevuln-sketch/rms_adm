import React, { useState, useEffect, useMemo } from 'react'
import { useGlobalFilter, useSortBy, useTable, usePagination } from "react-table";
import { useHistory } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { TableSP } from '../../../components';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import axios from 'axios';
import Swal from 'sweetalert2'
import Moment from 'moment'
const DataSpk = () => {

  const [spkData, setSpkData] = useState([])
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
    GetSpkData()

  }, [])

  const GetSpkData = async()=>{
    try {
      await axiosInstnce.get('/get-all-data-spk')
      .then(res=>{
        console.log(res.data)
        if(res.status === 200){
          setSpkData([])
        }
      })
    } catch (err) {
      if(err){
        console.log(err)
      }
    }
    
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
        axiosInstnce.delete(`/delete-spk?spk_id=${data}`).then(res => {
          if (res.status === 200) {
            Swal.fire(
              'Deleted!',
              `${res.data.message}`,
              'success'
            )
            GetSpkData()
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






  const DataApi = useMemo(() => [...spkData], [spkData])
  const Coloms = useMemo(() =>
  spkData[0] ?
      Object.keys(spkData[0]).filter(key=> key !== '__v')
        .map(key => {
          switch(key){
           
            case 'pengiriman':{
              return{
                Header: 'Pengiriman',
                accessor: (originalRow) => {
                  return originalRow.pengiriman
                }
              }
            }
            case 'pengambilan':{
              return{
                Header: 'Pengambilan',
                accessor: (originalRow) => {
                  return originalRow.pengambilan
                }
              }
            }
            case 'no_sj':{
              return{
                Header: 'No. SJ',
                accessor: (originalRow) => {
                  return originalRow.no_sj
                }
              }
            }
            case 'koli_jenis':{
              return{
                Header: 'Koli Jenis',
                accessor: (originalRow) => {
                  return originalRow.koli_jenis
                }
              }
            }
            case 'kg':{
              return{
                Header: 'KG',
                accessor: (originalRow) => {
                  return originalRow.kg
                }
              }
            }
            case 'jenis_layanan':{
              return{
                Header: 'Jenis Layanan',
                accessor: (originalRow) => {
                  return originalRow.jenis_layanan
                }
              }
            }
            case 'due_date':{
              return{
                Header: 'Due Date',
                accessor: (originalRow) => {
                  return Moment(originalRow.due_date).format('DD-MM-YYYY')
                }
              }
            }
            case 'jenis_armada':{
              return{
                Header: 'Jenis Armada',
                accessor: (originalRow) => {
                  return originalRow.jenis_armada
                }
              }
            }
            case 'dikirim_melalui':{
              return{
                Header: 'Dikirim Melalui',
                accessor: (originalRow) => {
                  return originalRow.dikirim_melalui
                }
              }
            }
            case 'biaya_kirim':{
              return{
                Header: 'Biaya Di Kirim',
                accessor: (originalRow) => {
                  return originalRow.biaya_kirim
                }
              }
            }
            case 'no_sp':{
              return{
                Header: 'No. SP',
                accessor: (originalRow) => {
                  return originalRow.no_sp.no_sp
                }
              }
            }
            case 'etd':{
              return{
                Header: 'ETD',
                accessor: (originalRow) => {
                  return originalRow.etd
                }
              }
            }
            case 'eta':{
              return{
                Header: 'ETA',
                accessor: (originalRow) => {
                  return originalRow.eta
                }
              }
            }
            case 'status':{
              return{
                Header: 'Status',
                accessor: (originalRow) => {
                  return originalRow.status
                }
              }
            }
            case 'tanggal_diterima':{
              return{
                Header: 'Tanggal Diterima',
                accessor: (originalRow) => {
                  return originalRow.tanggal_diterima
                }
              }
            }
            case 'nama_penerima':{
              return{
                Header: 'Nama Penerima',
                accessor: (originalRow) => {
                  return originalRow.nama_penerima
                }
              }
            }
            case 'do_balik':{
              return{
                Header: 'Do Balik',
                accessor: (originalRow) => {
                  return originalRow.do_balik
                }
              }
            }
          }
          return { Header: key.toLocaleUpperCase(), accessor: key }
        })
      : [],
    [spkData])

  return (
    <>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Monitoring SPK</h1>
              </div>
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
          <div className="d-flex flex-row justify-content-start align-items-center mb-3">
            <Link to="/create-new-spk" className="btn btn-primary">Buat SPK Baru</Link>
          </div>


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

export default DataSpk

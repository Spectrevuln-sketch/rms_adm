import React, { useState, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router';
import { TableSP } from '../../../components';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table } from 'reactstrap'
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import axios from 'axios';
import Swal from 'sweetalert2'
import Moment from 'moment'
const MonitoringDataPage = () => {
  const [data_monitoring, setDataMonitoring] = useState([])
  const [isopen, setIsopen] = useState(false)
  const [DataModal, setDataModal] = useState([])
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
    GetMonitoringData()

  }, [])

  const GetMonitoringData = async () => {
    await axiosInstnce.get('/get-detail-sp')
      .then(res => {
        setDataMonitoring(res.data)
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
        axiosInstnce.delete(`/delete-sp/${data}`, {
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
            GetMonitoringData()
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






  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Action",
        Header: "Action",
        Cell: ({ row }) => (
          <div className="d-flex flex-row justify-content-between align-items-center">

            <button onClick={() => DeleteData({ data: row.values._id })} className="btn btn-danger mr-2">
              Delete
            </button>

          </div>
        ),
      },

    ]);
  };


  const showModal = ({ data }) => {
    setIsopen(!isopen)
    setDataModal(data)
  }




  const DataApi = useMemo(() => [...data_monitoring], [data_monitoring])

  const Coloms = useMemo(() =>
    data_monitoring[0] ?
      Object.keys(data_monitoring[0])
        .filter(key => key !== '__v' && key !== 'customer_id' && key !== 'data_sp')
        .map(key => {

          switch (key) {
            case 'tanggal_sp': {
              return {
                Header: 'Tanggal SP',
                accessor: (originalRow) => {
                  return originalRow.tanggal_sp ? Moment(originalRow.tanggal_sp).format("DD-MM-YYYY") : originalRow.tanggal_sp
                }
              }
            }
            case 'dead_line': {
              return {
                Header: 'Dead Line',
                accessor: (originalRow) => {
                  return originalRow.dead_line ? Moment(originalRow.dead_line).format("DD-MM-YYYY") : originalRow.dead_line
                }
              }
            }
            case 'jenis_layanan': {
              return {
                Header: 'Layanan',
                accessor: 'jenis_layanan',
              }
            }
            case 'tanggal_pickup': {
              return {
                Header: 'Tanggal Pickup',
                accessor: (originalRow) => {
                  return originalRow.tanggal_pickup ? Moment(originalRow.tanggal_pickup).format("DD-MM-YYYY") : originalRow.tanggal_pickup
                }
              }
            }
            case 'satuan': {
              return {
                Header: 'Satuan',
                accessor: 'satuan',
              }
            }
            case 'jumlah_barang': {
              return {
                Header: 'Jumlah Barang',
                accessor: 'jumlah_barang',
              }
            }
            case 'nama_barang': {
              return {
                Header: 'Nama Barang',
                accessor: 'nama_barang',
              }
            }
            case 'ops': {
              return {
                Header: 'Oprational',
                accessor: 'ops',
              }
            }
            case 'no_sp': {
              return {
                Header: 'No. SP',
                accessor: 'no_sp',
              }
            }
            case 'do_balik': {
              return {
                Header: 'DO Balik',
                accessor: (originalRow) => {
                  return originalRow.do_balik ? Moment(originalRow.do_balik).format('DD-MM-YYYY') : originalRow.do_balik
                },
              }
            }
            case 'pengiriman_via': {
              return {
                Header: 'Via',
                accessor: 'pengiriman_via.via',
              }
            }
            case 'history_tujuan': {
              return {
                Header: 'Delivery Status',
                accessor: 'history_tujuan',
                Cell: ({ cell: { value } }) => (
                  <>
                    <div className="d-flex flex-row">
                      {value.length > 0 && (
                        <>
                          <table className="table flex-column justify-content-center algin-items-column no-border">
                            <thead className="border-0">
                              <tr className="border-0">
                                <th className="border-0 font-weight-light">
                                  Tanggal Terakhir
                                </th>
                                <th className="border-0 font-weight-light">
                                  Deskripsi
                                </th>
                              </tr>
                            </thead>

                            <tbody className="border-0" style={{ background: 'none' }}>
                              {value.map((history, idx) => (
                                idx === 0 && (

                                  <tr className="border-0">
                                    <td className="border-0">
                                      <span key={idx} id={'data-' + idx} className="mx-1 badge bg-success justify-content-between align-items-center">
                                        {history.tanggal ? Moment(history.tanggal).format('DD-MM-YYYY') : history.tanggal}
                                      </span>
                                    </td>
                                    <td className="border-0">
                                      <span key={idx} id={'data-' + idx} className="mx-1 justify-content-between align-items-center">
                                        {history.deskripsi}
                                      </span>
                                    </td>
                                  </tr>
                                )

                              ))}
                            </tbody>
                          </table>
                          <div className='d-flex flex-column justify-content-start align-items-center'>
                            <p className='mt-2  font-weight-light' style={{ marginBottom: '20px' }}>Detail Status</p>
                            <span onClick={() => showModal({ data: value })} className="badge badge-info" style={{ cursor: 'pointer' }}>
                              Detail Delivery
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )

              }
            }
          }

          return { Header: key, accessor: key }
        })
      : [],
    [data_monitoring])



  return (
    <>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Monitoring All Sp</h1>
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
      <div>

        <Modal
          toggle={() => setIsopen(!isopen)}
          isOpen={isopen}
          modalTransition={{ timeout: 1000 }}
          size='md'
          centered
        >
          <ModalHeader >
            Delivery Status Detail
          </ModalHeader>
          <ModalBody>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                {DataModal
                  .sort((data) => data.tanggal)
                  .map((data, idx) => (
                    <>
                      {idx === 0 && (

                        <tr className='bg-red'>
                          <td>
                            {data.tanggal}
                          </td>
                          <td>
                            {data.deskripsi}
                          </td>
                        </tr>
                      )}
                      {idx > 0 && (

                        <tr>
                          <td>
                            {data.tanggal}
                          </td>
                          <td>
                            {data.deskripsi}
                          </td>
                        </tr>
                      )}

                    </>
                  ))}

              </tbody>
            </table>

          </ModalBody>
          <ModalFooter>

            <Button onClick={() => setIsopen(!isopen)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}

export default MonitoringDataPage

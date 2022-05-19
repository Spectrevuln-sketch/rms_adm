import React, { useState, useMemo, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import ReactTable, { useGlobalFilter, useSortBy, useTable, usePagination } from "react-table";
import axios from 'axios';
import Swal from 'sweetalert2'
import styled from 'styled-components';
// component
import { SearchFilterTables } from '../../../components'
import { InputDefault, InputForm } from '../../atoms';


const CardTables = styled.div`
width: 120rem;
height: 'fit-content';
overflow: hidden;
/* overflow-x: scroll;  */
overflow-y: scroll; 
table{
 
  th,
    td {
      margin: 0;
      padding: 0.5rem;

      :last-child {
        border-right: 0;
      }
    }

  }
`;


const TableSP = ({ actionEdit, actionDelete, data, column, tableHooks, CreateURL, ButtonCreateCustomer }) => {
  // state
  const [show_input, setShowInput] = useState(false)
  const [customer_name, setCustomer] = useState('')
  const [input_customer, setInput] = useState([])
  const history = useHistory();
  /* ----------------------------- AXIOS INSTANCE ----------------------------- */
  var axiosInstnce = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  })
  /* ----------------------------- END AXIOS INSTANCE ----------------------------- */



  const CreateCustomer = async (e) => {
    e.preventDefault();
    await axiosInstnce.post('/create-customer', {
      customer_name
    }).then(res => {
      if (res.status === 200) {
        Swal.fire(
          'Berhasil Tambah Customer',
          `${res.data.message}`,
          'success'
        )
        history.go(0)
      }
    })
      .catch(err => {
        console.log(err)
      })

  }










  const tableInstance = useTable(
    {
      columns: column,
      data: data,

      initialState: {
        hiddenColumns: ["_id"]
      }
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    tableHooks ? tableHooks : ""
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
  } = tableInstance

  const { pageIndex, pageSize } = state

  return (
    <>
      {show_input === true && (
        <div className="py-2 col-4">
          <InputDefault label="Buat Customer" name="customer_name" onChange={(e) => setCustomer(e.target.value)} />
          <button className="btn btn-primary mr-2" type="button" onClick={CreateCustomer}>Submit</button>
          <button className="btn btn-secondary" type="button" onClick={() => setShowInput(false)}>Close</button>
        </div>
      )}
      <div className="card" style={{ width: "fit-content" }}>
        {ButtonCreateCustomer === true && (
          <button className="btn btn-primary d-inline-block float-right" type="button" onClick={() => setShowInput(true)}>Input Customer Baru</button>
        )}

        <div className="card-header">
          <h3 className="card-title"></h3>
        </div>
        <div className="row">
          <div className="col-6 ml-4 mt-2">
          </div>
          <div className="col-12 d-flex justify-content-end">

            <SearchFilterTables
              preGlobalFilteredRows={preGlobalFilteredRows}
              setGlobalFilter={setGlobalFilter}
              globalFilter={state.globalFilter}
            />
          </div>
        </div>

        {/* /.card-header */}
        <CardTables className="card-body" >
          <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
            <div className="row">
              <div className="col-sm-12">
                {data && (


                  <table className="table table-striped m-0" {...getTableProps()}>
                    <thead className="text-center">
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                              {column.render("Header")}
                              {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.map((row, idx) => {
                        prepareRow(row);
                        return (

                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell, idx) => (

                              <td {...cell.getCellProps()}>

                                {cell.isAggregated
                                  ?
                                  cell.render("Aggregated")
                                  : cell.isPlaceholder
                                    ? null
                                    :
                                    cell.render("Cell")}
                                {/* {cell.render("Cell")} */}
                              </td>
                            ))}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-5">
                <div
                  className="dataTables_info"
                  id="example1_info"
                  role="status"
                  aria-live="polite"
                >
                  Page{' '}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{' '}
                  <span>
                    | Go to page:{' '}
                    <input
                      type="number"
                      defaultValue={pageIndex + 1}
                      onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                      }}
                      style={{ width: '50px' }}
                    />
                  </span>{' '}
                </div>

              </div>
              <div className="col-sm-12 col-md-7">
                <div
                  className="dataTables_paginate paging_simple_numbers"
                  id="example1_paginate"
                >
                  <ul className="pagination">
                    <li
                      className="paginate_button page-item previous disabled"
                      id="example1_previous"
                    >
                      <button
                        aria-controls="example1"
                        data-dt-idx={0}
                        tabIndex={0}
                        className="page-link d-inline-block"
                        onClick={() => gotoPage(0)} disabled={!canPreviousPage}
                      >
                        {'<<'}
                      </button>
                      <button
                        aria-controls="example1"
                        data-dt-idx={0}
                        tabIndex={0}
                        className="page-link d-inline-block"
                        onClick={() => previousPage()} disabled={!canPreviousPage}
                      >
                        {'<'}
                      </button>
                    </li>

                    <li className="paginate_button page-item next" id="example1_next">
                      <button
                        href="#"
                        aria-controls="example1"
                        data-dt-idx={7}
                        tabIndex={0}
                        className="page-link d-inline-block"
                        onClick={() => nextPage()} disabled={!canNextPage}
                      >
                        {'>'}
                      </button>
                      <button
                        href="#"
                        aria-controls="example1"
                        data-dt-idx={7}
                        tabIndex={0}
                        className="page-link d-inline-block"
                        onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}
                      >
                        {'>>'}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-12 col-md-7">

                <select
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value))
                  }}
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </CardTables>
        {/* /.card-body */}
      </div>
    </>
  )
}

export default TableSP

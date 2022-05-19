import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AdminDashboardFooter, NavBarDashboard, SideBarDashboard } from '../../components';
import {
  Dashboard,
  PengirimanDarat,
  PengirimanLaut,
  CreateDaratData,
  CreateSP, AdminInputDashboard,
  CreateUdara,
  CreateLaut,
  DataSpk,
  CreateNewSpk,
  MonitoringDataPage,
  CreateDelivery, 
  CreateNewAdmin
} from '../Content';
import PengirimanUdara from '../Content/PengirimanUdara';

import { Helmet } from "react-helmet";
const MainPage = () => {
  return (
    <>
      <div className="wrapper">
        <NavBarDashboard />
        <SideBarDashboard />
        <Switch>
          <Route path="/update-udara/:sp_id">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Update Data Udara</title>
            </Helmet>
            <CreateUdara />
          </Route>
          <Route path="/create-sp">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Buat SP Baru</title>
            </Helmet>
            <CreateSP />
          </Route>
          <Route path="/udara">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Monitoring Udara</title>
            </Helmet>
            <PengirimanUdara />
          </Route>
          <Route path="/update-laut/:sp_id">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Update Data Laut</title>
            </Helmet>
            <CreateLaut />
          </Route>
          <Route path="/laut">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Monitoring Laut</title>
            </Helmet>
            <PengirimanLaut />
          </Route>
          <Route path="/create-darat/:sp_id">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Buat Data Via Darat</title>
            </Helmet>
            <CreateDaratData />
          </Route>
          <Route path="/data-spk">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Data SPK</title>
            </Helmet>
            <DataSpk />
          </Route>
          <Route path="/monitoring-sp">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Data Monitoring</title>
            </Helmet>
            <MonitoringDataPage />
          </Route>
          <Route path="/darat">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Monitoring Darat</title>
            </Helmet>
            <PengirimanDarat />
          </Route>
          <Route path="/admin-input">
            <Helmet>
              <meta charSet="utf-8" />
              <title>System Monitoring Rms</title>
            </Helmet>
            <AdminInputDashboard />
          </Route>
          <Route path="/create-new-spk">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Create New SPK</title>
            </Helmet>
            <CreateNewSpk />
          </Route>
          <Route path="/delivery-status/:sp_id">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Create Delivery Status</title>
            </Helmet>
            <CreateDelivery />
          </Route>
          <Route path="/create-user">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Create New Admin</title>
            </Helmet>
            <CreateNewAdmin />
          </Route>
          <Route path="/dashboard-master">
            <Helmet>
              <meta charSet="utf-8" />
              <title>System Monitoring Rms</title>
            </Helmet>
            <Dashboard />
          </Route>
        </Switch>
      </div>
      {/* <AdminDashboardFooter /> */}
    </>
  )
}

export default MainPage

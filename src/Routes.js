import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage, MainPage } from './page';
import CheckLoginContext from './context/CheckLoginContext'
import CheckRoleContext from './context/CheckRoleContext'
import { Helmet } from 'react-helmet'
const Routes = () => {
  const { loggedin } = useContext(CheckLoginContext)
  const { checkRole } = useContext(CheckRoleContext)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedin === false ? <Redirect to="/login-page" /> : loggedin === true && checkRole === 1 ? <Redirect to="/dashboard-master" /> : loggedin === true && checkRole === 2 && loggedin === true && checkRole === 1 ? <Redirect to="/darat" /> : loggedin === true && checkRole === 3 && checkRole === 1 ? <Redirect to="/laut" /> : loggedin === true && checkRole === 4 && checkRole === 1 ? <Redirect to="/udara" /> : loggedin === true && checkRole === 5 && checkRole === 1 ? <Redirect to="/admin_input" /> : <MainPage />}
        </Route>
        <Route path="/login-page">
          {loggedin === false ? <LoginPage /> : loggedin === true && checkRole === 1 ? <Redirect to="/dashboard-master" /> : loggedin === true && checkRole === 2 ? <Redirect to="/darat" /> : loggedin === true && checkRole === 3 ? <Redirect to="/laut" /> : loggedin === true && checkRole === 4 ? <Redirect to="/udara" /> : loggedin === true && checkRole === 5 ? <Redirect to="/admin_input" /> : <LoginPage />}
        </Route>
        <Route path="/udara">
          {loggedin === false ? <Redirect to="/login-page" /> : loggedin === true && checkRole === 2 && checkRole === 1 ? <Redirect to="/darat" /> : loggedin === true && checkRole === 3 && checkRole === 1 ? <Redirect to="/laut" /> : loggedin === true && checkRole === 4 && checkRole === 1 ? <MainPage /> : loggedin === true && checkRole === 5 && checkRole === 1 ? <Redirect to="/admin_input" /> : <MainPage />}
        </Route>
        <Route path="/darat">
          {loggedin === false ? <Redirect to="/login-page" /> : loggedin === true && loggedin === true && checkRole === 2 && checkRole === 1 ? <MainPage /> : loggedin === true && checkRole === 3 && checkRole === 1 ? <Redirect to="/laut" /> : loggedin === true && checkRole === 4 && checkRole === 1 ? <Redirect to="/udara" /> : loggedin === true && checkRole === 5 && checkRole === 1 ? <Redirect to="/admin_input" /> : <MainPage />}
        </Route>
        <Route path="/laut">
          {loggedin === false ? <Redirect to="/login-page" /> : loggedin === true && checkRole === 2 && checkRole === 1 ? <Redirect to="/darat" /> : loggedin === true && checkRole === 3 && checkRole === 1 ? <MainPage /> : loggedin === true && checkRole === 4 && checkRole === 1 ? <Redirect to="/udara" /> : loggedin === true && checkRole === 5 && checkRole === 1 ? <Redirect to="/admin_input" /> : <MainPage />}
        </Route>
        <Route path="/admin-input">
          {loggedin === false ? <Redirect to="/login-page" /> : loggedin === true && checkRole === 2 && checkRole === 1 ? <Redirect to="/darat" /> : loggedin === true && checkRole === 3 && checkRole === 1 ? <Redirect to="/laut" /> : loggedin === true && checkRole === 4 && checkRole === 1 ? <Redirect to="/udara" /> : loggedin === true && checkRole === 5 && checkRole === 1 ? <MainPage /> : <MainPage />}
        </Route>
        <Route path="/dashboard-master">
          {loggedin === false ? <Redirect to="/login-page" /> : loggedin === true && checkRole === 1 ? <MainPage /> : loggedin === true && checkRole === 2 && checkRole === 1 ? <Redirect to="/darat" /> : loggedin === true && checkRole === 3 && checkRole === 1 ? <Redirect to="/laut" /> : loggedin === true && checkRole === 4 && checkRole === 1 ? <Redirect to="/udara" /> : loggedin === true && checkRole === 5 && checkRole === 1 ? <Redirect to="/admin_input" /> : <MainPage />}
        </Route>
        {/* Untuk Path Index Harus Di Taruh Paling Bawah */}


        {loggedin === false && checkRole === false && (
          <Route path="/login-page">
            <MainPage />
          </Route>
        )}

        {loggedin === true && (
          <>
            {/* Create Delivery Status */}
            <Route path="/delivery-status/:sp_id">
              <MainPage />
            </Route>
            {/* Create Admin */}
            <Route path="/create-user">
              <MainPage />
            </Route>
            {/* Create SPK */}
            <Route path="/monitoring-sp">
              <MainPage />
            </Route>
            {/* Create SPK */}
            <Route path="/create-new-spk">
              <MainPage />
            </Route>
            {/* Data SPK */}
            <Route path="/data-spk">
              <MainPage />
            </Route>
            {/* admin sp */}
            <Route path="/admin-input">
              <MainPage />
            </Route>

            <Route path="/create-sp">
              <MainPage />
            </Route>
            {/* End admin sp */}
            <Route path="/update-udara/:sp_id">
              <MainPage />
            </Route>
            <Route path="/udara">
              <MainPage />
            </Route>

            <Route path="/create-darat/:sp_id">
              <MainPage />
            </Route>

            <Route path="/darat">
              <MainPage />
            </Route>
            <Route path="/update-laut/:sp_id">
              <MainPage />
            </Route>

            <Route path="/laut">
              <MainPage />
            </Route>

            <Route path="/dashboard-master">
              <MainPage />
            </Route>
          </>
        )}
        {/* End Untuk Path Index Harus Di Taruh Paling Bawah */}
      </Switch>
    </Router>
  )
}

export default Routes

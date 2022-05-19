import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import styled from "styled-components";
import { Helmet } from 'react-helmet';
import CheckLoginContext from '../../context/CheckLoginContext'
import CheckRoleContext from '../../context/CheckRoleContext'
import Swal from 'sweetalert2'
import axios from 'axios';
/* Style */
const LoginContainer = styled.div`
margin:10vw auto;
`;

const PageLink = styled(Link)`
margin: auto;
text-align: center;
`;

/* End Style */

const LoginPage = () => {

  const { GetLogin } = useContext(CheckLoginContext)
  const { CheckRoleData } = useContext(CheckRoleContext)

  const [admin_email, setEmail] = useState("")
  const [admin_password, setPassword] = useState('')
  /* ----------------------------- AXIOS INSTANCE ----------------------------- */
  var axiosInstnce = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  })
  /* ----------------------------- END AXIOS INSTANCE ----------------------------- */
  const history = useHistory()



  const AuthLogin = async (e) => {
    e.preventDefault();
    const LoginAuth = await axiosInstnce.post('/auth-login-admin', {
      admin_email,
      admin_password
    })
    if (LoginAuth) {
      if (LoginAuth.status === 200) {
        await GetLogin()
        await CheckRoleData()
        await Swal.fire(
          'Berhasil Login',
          `${LoginAuth.data.message}`,
          'success'
        )
        await history.push('/')
      }

    } else {
      console.log(LoginAuth.message)
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>System Monitoring | Login</title>
      </Helmet>
      <LoginContainer className="login-box">
        {/* /.login-logo */}
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <PageLink to="#" className="h1"><b>Admin</b>Mon</PageLink>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={AuthLogin}>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                {/* /.col */}
                <div className="col-8 mx-auto">
                  <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                </div>
                {/* /.col */}
              </div>
            </form>
            {/* <div className="social-auth-links text-center mt-2 mb-3">
            <Link href="#" className="btn btn-block btn-primary">
              <i className="fab fa-facebook mr-2" /> Sign in using Facebook
            </Link>
            <Link href="#" className="btn btn-block btn-danger">
              <i className="fab fa-google-plus mr-2" /> Sign in using Google+
            </Link>
          </div> */}
            {/* /.social-auth-links */}

            {/* <div className="mb-1">
              <PageLink className="text-center" href="forgot-password.html">I forgot my password</PageLink>
            </div> */}
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </LoginContainer>
    </>
  )
}

export default LoginPage

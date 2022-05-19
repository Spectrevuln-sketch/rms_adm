import React, { useEffect } from 'react'
import Routes from '../Routes'
import { SpContextProvider } from '../context/SPContext'
import { CurrentAkunContextProvider } from '../context/CurrentAkunLoginContext'
import { CheckLoginContextProvider } from '../context/CheckLoginContext'
import { CheckRoleContextProvider } from '../context/CheckRoleContext'
import { ArmadaContextProvider } from '../context/ArmadaContext'
import { CustomerContextProvider } from '../context/CustomerContext'
import axios from 'axios';

/* Axios Instance */
axios.defaults.withCredentials = true;
/* End Axios Instance */

function App() {
  return (
    <>
      <CheckLoginContextProvider>
        <CheckRoleContextProvider>
          <CurrentAkunContextProvider>
            <SpContextProvider>
              <ArmadaContextProvider>
                <CustomerContextProvider>
                  <Routes />
                </CustomerContextProvider>
              </ArmadaContextProvider>
            </SpContextProvider>
          </CurrentAkunContextProvider>
        </CheckRoleContextProvider>
      </CheckLoginContextProvider>
    </>
  );
}

export default App;

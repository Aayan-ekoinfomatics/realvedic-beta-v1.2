import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './App'
import ScrollToTop from './helpers/scrollToTop'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-phone-input-2/lib/style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <ScrollToTop />
        <GoogleOAuthProvider clientId="785634242367-1ajmiu021l1632741706d11cuf2dbb26.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
)
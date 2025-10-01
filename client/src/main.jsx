import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Navbar from './components/nav/Navbar.jsx'
import Footer from './components/nav/Footer.jsx'
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar></Navbar>
    <div style={{paddingTop: "2rem"}}>
    <App />
    </div>

    <Footer></Footer>
    <Toaster></Toaster>

  </StrictMode>,
)

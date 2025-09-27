import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Navbar from './components/nav/Navbar.jsx'
import Footer from './components/nav/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar></Navbar>
    <App />
    <Footer></Footer>
  </StrictMode>,
)

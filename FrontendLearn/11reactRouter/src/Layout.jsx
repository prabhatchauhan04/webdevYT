import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
// ye outlet dynamically baki content insert krne mein help krega
// ye baki saari cheezon ko as a base maankr jo Outlet tag hoga uski jagah jo chahe woh page lgadega

const Layout = () => {
  return (
    <>
        <Header />
        <Outlet /> 
        <Footer />
    </>
  )
}

export default Layout




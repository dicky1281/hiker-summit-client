import React from 'react'
import { Outlet } from 'react-router-dom'
import ScrollUp from '../ScrollUp'
import Footer from './GlobalComponent/Footer/Footer'
import Navigation from './GlobalComponent/NavigationBar/Navigation'

const Layout = () => {
  return (
    <main className='App'>
      
      <Navigation/>
        <Outlet/>
        <Footer/>
    </main>
  )
}

export default Layout
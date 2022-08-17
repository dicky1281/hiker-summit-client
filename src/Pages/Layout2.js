import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './GlobalComponent/SideBar/SideBar'
import '../Pages/GlobalComponent/SideBar/SideBar.scss'

const Layout2 = () => {
  return (
    <section>
        <SideBar/>
        <Outlet/>
    </section>
  )
}

export default Layout2
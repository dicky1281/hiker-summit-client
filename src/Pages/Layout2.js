import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './GlobalComponent/SideBar/SideBar'
import { useSelector } from 'react-redux'
import '../Pages/GlobalComponent/SideBar/SideBar.scss'

const Layout2 = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <section>
        <SideBar/>
        
        <Outlet/>
    </section>
  )
}

export default Layout2
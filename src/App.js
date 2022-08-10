import React, {useState, useEffect } from 'react'
import { Route, Routes, Navigate} from 'react-router-dom'
import './App.scss'
import Navigation from './Pages/GlobalComponent/NavigationBar/Navigation';
import Login from './Pages/Login/Login';
import Layout from './Pages/Layout'
import Home from './Pages/Home/Home';
import Explore from './Pages/Explore/Explore';
import Destination from './Pages/Destination/Destination';
import RequireAuth from './Pages/RequireAuth';
import Guide from './Pages/Guide/Guide';
import Suggest from './Pages/Suggest/Suggest';
import Register from './Pages/Register/Register';
import Layout2 from './Pages/Layout2';
import DashboardAccount from './Pages/Dashboard/DashboardAccount';
import DashboardInformation from './Pages/Dashboard/DashboardInformation';
import DashboardOrder from './Pages/Dashboard/DashboardOrder';
import DashboardWishlist from './Pages/Dashboard/DashboardWishlist';
import SignUp from './Pages/Register/Register';
import Search from './Pages/Search/Search';




function App() {

  const [loading , setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 100);
  },[])
  return (
    <>
   {loading ? (
        <div className="order-content">
          <div className="loadingio-spinner-rolling-mhmrujtmme">
            <div className="ldio-x7xj3ccq8ts">
              <div></div>
            </div>
          </div>
        </div>
      ):(<Routes>
        <Route path="/" element={<Layout/>}>
          {/* Public  */}
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/explore/" element={<Explore/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/explore/:id" element={<Destination/>}/>
  
          {/* Private */}
          <Route element={<RequireAuth/>}>
            <Route path='/guide' element={<Guide/>}/>
            <Route path='/suggest' element={<Suggest/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<SignUp/>}/>
          </Route>
          <Route  element={<Layout2/>}>
            <Route path='/dashboard/akun/:id' element={<DashboardAccount/>}/>
            <Route path='/dashboard/informasi/:id' element={<DashboardInformation/>}/>
            <Route path='/dashboard/pesanan/:id' element={<DashboardOrder/>}/>
            <Route path='/dashboard/wishlist/:id' element={<DashboardWishlist/>}/>
          </Route>
      </Routes>)}
    
   
    </>
  );
}

export default App;

import React from 'react'
import '../styles/pageFormat.css'
import Sidebar from '../components/SideBar';
import Navbar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const SharedLayOut = ({Autherization})=> {  

  return (
    <div className="container">

          <div className='sidebar'>
            <Sidebar apiData={Autherization}/>
          </div>
          
          <div className='combo'>
            
            <div className='Navbar'>
                <Navbar apiData={Autherization} />              
            </div>
            
            <div className='MainContent' >
                <Outlet />
            </div>
          
          </div>
    
    </div>  
  )
}

export default SharedLayOut
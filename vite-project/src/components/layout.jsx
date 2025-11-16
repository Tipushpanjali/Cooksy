import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <Navbar />
      <div className=' '>
        <Outlet /> 
      </div>
      
        
    </>
  )
}

export default Layout

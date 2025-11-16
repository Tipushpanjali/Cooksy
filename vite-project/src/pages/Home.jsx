import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CardSwap from '../components/designs/CardSwap'
import Contact from '../components/Contact'


function Home() {
  return (
   <div className='flex flex-col gap-4 mt-20'>
    <CardSwap/>
    <Contact/>
        <Footer/>
    </div>
  )
}

export default Home
import React from 'react'
import Sidebar from '../Components/Home/Sidebar'
import { Outlet } from 'react-router-dom'
import MiniSideBar from '../Components/Home/MiniSideBar'


const Home = () => {
  return (
    <div className='flex h-[90vh] gap-4' >
      <div className='w-1/6 border border-gray-500 rounded-xl p-4 hidden lg:flex flex-col justify-between'><Sidebar /></div>
      <div className='lg:hidden'><MiniSideBar /></div>
      <div className='lg:w-5/6 w-full z-10 border border-gray-500 rounded-xl p-4'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
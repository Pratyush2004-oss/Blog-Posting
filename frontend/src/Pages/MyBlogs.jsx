import React, { useEffect, useState } from 'react'
import Cards from '../Components/Home/Cards'
import { useAuthcontext } from '../Context/AuthContext'
import { BLOG_API_END_POINT } from '../assets/Apis'
import axios from 'axios'
import toast from 'react-hot-toast'

const MyBlogs = () => {
    const [allMyBlogs, setAllMyBlogs] = useState([])
    const { authUser } = useAuthcontext();
    useEffect(() => {
      const FetchallMyBlogs = async () => {
        try {
          const res = await axios.get(`${BLOG_API_END_POINT}/getuserblogs`, { withCredentials: true })
          if (res.data.success) {
            setAllMyBlogs(res.data.blogs)
          }
        } catch (error) {
          toast.error(error.response.data.message)
        }
      }
      FetchallMyBlogs();
    }, [authUser, allMyBlogs])
  return (
    <div>
      <div className='sticky top-0 flex items-center justify-between p-3'>
        <h1 className='p-2 font-serif text-3xl font-bold border-b-2'>My Blogs</h1>
      </div>
      <Cards Blogs={allMyBlogs} />
    </div>
  )
}

export default MyBlogs
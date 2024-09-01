import React, { useEffect, useState } from 'react'
import Cards from '../Components/Home/Cards'
import { PlusCircle } from 'lucide-react'
import InputData from '../Components/Home/InputData';
import { useAuthcontext } from '../Context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast'
import { BLOG_API_END_POINT } from '../assets/Apis';

const AllBlogs = () => {
  const [allBlogs, setallBlogs] = useState([])
  const { authUser } = useAuthcontext();
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    const FetchallBlogs = async () => {
      try {
        const res = await axios.get(`${BLOG_API_END_POINT}/get`, { withCredentials: true })
        if (res.data.success) {
          setallBlogs(res.data.blogs)
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    FetchallBlogs();
  }, [authUser, allBlogs])
  return (
    <div>
      <div className='flex items-center justify-between p-3 sticky top-0 bg-gray-900'>
        <h1 className='text-xl md:text-3xl p-2 font-serif font-bold border-b-2'>All Blogs</h1>
        <button onClick={() => setOpenDialog(true)} className='btn btn-outline  transition-all duration-300'><PlusCircle /> Add Blog</button>
      </div>
      <Cards Blogs={allBlogs} />
      <InputData setOpenDialog={setOpenDialog} openDialog={openDialog} />
    </div>
  )
}

export default AllBlogs
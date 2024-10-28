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
      <div className='sticky top-0 flex items-center justify-between p-3'>
        <h1 className='p-2 font-serif text-xl font-bold border-b-2 md:text-3xl'>All Blogs</h1>
        <button onClick={() => setOpenDialog(true)} className='transition-all duration-300 btn btn-outline'><PlusCircle /> Add Blog</button>
      </div>
      <Cards Blogs={allBlogs} />
      <InputData setOpenDialog={setOpenDialog} openDialog={openDialog} />
    </div>
  )
}

export default AllBlogs
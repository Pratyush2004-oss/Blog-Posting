import React, { useEffect, useState } from 'react'
import Cards from '../Components/Home/Cards'
import { useAuthcontext } from '../Context/AuthContext'
import { BLOG_API_END_POINT } from '../assets/Apis'
import axios from 'axios'

const FavouriteBlogs = () => {
    const [allFavouriteBlogs, setAllFavouriteBlogs] = useState([])
    const { authUser } = useAuthcontext();
    useEffect(() => {
      const FetchallFavouriteBlogs = async () => {
        try {
          const res = await axios.get(`${BLOG_API_END_POINT}/getFavourite`, { withCredentials: true })
          if (res.data.success) {
            setAllFavouriteBlogs(res.data.blogs)
          }
        } catch (error) {
          toast.error(error.response.data.message)
        }
      }
      FetchallFavouriteBlogs();
    }, [authUser, allFavouriteBlogs])
  return (
    <div>
      <div className='flex items-center justify-between p-3 sticky top-0 bg-gray-900'>
        <h1 className='text-3xl p-2 font-serif border-b-2 font-bold'>Favourites</h1>
      </div>
      <Cards Blogs={allFavouriteBlogs} />
    </div>
  )
}

export default FavouriteBlogs
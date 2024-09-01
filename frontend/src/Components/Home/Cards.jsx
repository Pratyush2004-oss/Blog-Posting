import React from 'react'
import { Heart, Star, Trash2Icon } from 'lucide-react'
import axios from 'axios'
import { BLOG_API_END_POINT } from '../../assets/Apis'
import toast from 'react-hot-toast'
import { useAuthcontext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Cards = ({ Blogs }) => {
    const { authUser } = useAuthcontext();
    const navigate = useNavigate();

    // delete Task
    const deleteTask = async (TaskId) => {
        try {
            const res = await axios.get(`${BLOG_API_END_POINT}/${TaskId}/delete`, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    // update to favourite 
    const updatefavourite = async (status, BlogId) => {
        try {
            const res = await axios.post(`${BLOG_API_END_POINT}/${BlogId}/updatefavourite`, { status }, { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return Blogs && (
        <div className='h-[75vh] overflow-y-auto'>
            <div className={`${Blogs.length > 0 && 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'} p-4`}>
                {Blogs.length > 0 ? Blogs.map((item, idx) => (
                    <div key={idx} className='bg-gray-800 z-0 max-h-1/3 flex flex-col justify-between rounded-xl shadow-xl p-2'>
                        <div className='my-2'>
                            <h1 className='text-lg font-bold'>{item.title}</h1>
                            <p className='text-sm my-2 text-gray-500 text-justify line-clamp-3'>{item.description}</p>
                        </div>
                        <div className='flex items-center justify-between m-2'>
                            <button onClick={() => navigate(`/displayblog/${item._id}`)} className='btn btn-sm btn-info'>Read Blog</button>
                            <div className='flex items-center gap-2'>
                                <Star onClick={() => updatefavourite((!item.favourite ? true : false), item._id)} className={`hover:text-yellow-500 hover:scale-105 transition-all hover:fill-yellow-500 ${item.favourite ? 'fill-yellow-500 text-yellow-500' : ''} cursor-pointer`} />
                                {
                                    item.user == authUser._id &&
                                    <Trash2Icon onClick={() => deleteTask(item._id)} className=' hover:text-red-400  cursor-pointer' />
                                }
                            </div>
                        </div>
                    </div>
                )) :
                    <h1 className='text-red-400 text-xl font-mono text-center'>No Blogs listed</h1>
                }
            </div>
        </div>
    )
}

export default Cards 
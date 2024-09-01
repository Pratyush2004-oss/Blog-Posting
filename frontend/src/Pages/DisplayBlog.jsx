import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BLOG_API_END_POINT } from '../assets/Apis';
import toast from 'react-hot-toast';
import { Star } from 'lucide-react';

const DisplayBlog = () => {
    const params = useParams();
    const BlogId = params.id;
    const [details, setDetails] = useState();

    useEffect(() => {
        const getBlogDetails = async () => {
            try {
                const res = await axios.get(`${BLOG_API_END_POINT}//get/${BlogId}`, { withCredentials: true })
                if (res.data.success) {
                    setDetails(res.data.blog)
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        getBlogDetails();
    }, [BlogId,details])

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
    return details && (
        <div className='flex h-[85vh] flex-col justify-between items-center'>
            <div className='flex items-center justify-between p-3 sticky top-0 bg-gray-900 w-full'>
                <h1 className='text-3xl p-2 font-serif font-bold border-b-2'>{details.title}</h1>
                <Star onClick={() => updatefavourite((!details.favourite ? true : false), BlogId)} className={`hover:text-yellow-500 hover:scale-105 transition-all hover:fill-yellow-500 ${details.favourite ? 'fill-yellow-500 text-yellow-500' : ''} cursor-pointer w-10 h-10`} />
            </div>
            <div className='h-[65vh] overflow-y-auto p-2'>
                <p className='text-justify md:text-lg'>{details.description}</p>
            </div>
            <div className='flex justify-end w-full'>
                <span>Uploaded At : {details.createdAt.split("T")[0]}</span>
            </div>
        </div>
    )
}

export default DisplayBlog
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BLOG_API_END_POINT } from '../../assets/Apis'
import { useNavigate } from 'react-router-dom'

const InputData = ({ openDialog, setOpenDialog }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: '',
        description: ''
    })
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${BLOG_API_END_POINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/')
                setOpenDialog(false)
                setInput({
                    title: '',
                    description: ''
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog className="modal" open={openDialog}>
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Add Blog</h3>
                    <hr />
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3 my-5'>
                        <label className="w-full form-control">
                            <div className="label">
                                <span className="text-lg font-bold label-text">Title</span>
                            </div>
                            <input value={input.title} name='title' onChange={changeEventHandler} type="text" placeholder="Enter Title" className="w-full input input-bordered" />
                        </label>
                        <label className="w-full form-control">
                            <div className="label">
                                <span className="text-lg font-bold label-text">Description</span>
                            </div>
                            <textarea value={input.description} name='description' onChange={changeEventHandler} className="textarea h-52 textarea-bordered" placeholder="Enter Description"></textarea>                        </label>
                        <div className='flex items-center justify-end gap-4 mt-5'>
                            <button type='button' onClick={() => setOpenDialog(false)} className="rounded-full btn btn-error btn-sm">Close</button>
                            <button className="rounded-full btn btn-success btn-sm" type='submit'>{loading ? <span className='loading loading-dots'></span> : 'Submit'}</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default InputData
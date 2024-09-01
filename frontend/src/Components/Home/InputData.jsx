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
                    <h3 className="font-bold text-lg">Add Blog</h3>
                    <hr />
                    <form onSubmit={handleSubmit} className='flex flex-col gap-3 my-5'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg font-bold">Title</span>
                            </div>
                            <input value={input.title} name='title' onChange={changeEventHandler} type="text" placeholder="Enter Title" className="input input-bordered w-full" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg font-bold">Description</span>
                            </div>
                            <textarea value={input.description} name='description' onChange={changeEventHandler} className="textarea h-52 textarea-bordered" placeholder="Enter Description"></textarea>                        </label>
                        <div className='flex justify-end mt-5 items-center gap-4'>
                            <button type='button' onClick={() => setOpenDialog(false)} className="btn btn-error btn-sm rounded-full">Close</button>
                            <button className="btn btn-success btn-sm rounded-full" type='submit'>{loading ? <spqn className='loading loading-dots'></spqn> : 'Submit'}</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

export default InputData
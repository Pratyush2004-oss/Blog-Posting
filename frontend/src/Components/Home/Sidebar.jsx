import React from 'react'
import { Data } from '../../Assets/SidebarData'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuthcontext } from '../../Context/AuthContext'
import axios from 'axios'
import { USER_API_END_POINT } from '../../assets/Apis'
import toast from 'react-hot-toast'

const Sidebar = () => {
    const { authUser, setauthUser } = useAuthcontext();
    const Logout = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            // localstorage
            localStorage.removeItem("chat-user")

            // context
            setauthUser(null);

            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return authUser && (
        <>
            <div className=''>
                <h2 className='text-xl font-extrabold'>The Blog <span className='text-red-500'>Master</span></h2>
                <h2 className='my-1 text-sm text-gray-300'>{authUser.username}</h2>
                <h2 className='my-1 text-sm text-gray-300'>{authUser.email}</h2>
                <hr />
            </div>
            <div>
                {Data.map((item, idx) => (
                    <Link to={item.link} className='m-2 flex gap-4 items-center rounded-md p-2 hover:bg-gray-600 transition-all duration-300' key={idx}> <item.icon /> {item.title}</Link>
                ))}
            </div>
            <div><button onClick={Logout} className='btn btn-outline gap-3 w-full'>Logout <LogOut /></button></div>
        </>
    )
}

export default Sidebar
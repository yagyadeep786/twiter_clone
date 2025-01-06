import React from 'react';
import { CiHome } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/Constant';
import { useNavigate } from 'react-router-dom';
import {getUser,getMyProfile,getOtherUser,setbookmarkTweets} from "../../redux/UserSclice"
import { useDispatch } from 'react-redux';
const LeftSidebar = () => {
    const dispatch= useDispatch();
    const {user}= useSelector((state)=> {return state.user});
    const navigate= useNavigate();
    const logoutHandler= async()=>{
        try {
            const res= await axios.get(`${USER_API_END_POINT}/logout`);
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.msg);
              
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }
    return (
        <div className='w-[15%]'>
            <div>
                <img src="https://img.freepik.com/premium-vector/twitter-new-x-logo-design-vector_1340851-70.jpg?semt=ais_hybrid" alt="logo" className='w-10 ml-6' />
            </div>
            <div className="list flex flex-col gap-1">
                <Link to=""><div className='flex gap-2 items-center px-6 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
                    <div><CiHome size={"25px"}/></div>
                    <h3 className='text-lg'>Home</h3>
                </div>
                </Link>
                <Link to={"./bookmark"}>
                <div className='flex gap-2 items-center px-6 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
                    <div><CiBookmark size={"25px"}/></div>
                    <h3 className='text-lg'>Bookmark</h3>
                </div>
                </Link>

                <div className='flex gap-2 items-center px-6 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
                    <div><IoIosNotificationsOutline size={"25px"}/></div>
                    <h3 className='text-lg'>Notifications</h3>
                </div>
                <Link to={"./profile/"+user?._id}><div className='flex gap-2 items-center px-6 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
                    <div><CiUser size={"25px"}/></div>
                    <h3 className='text-lg'>Profile</h3>
                </div>
                </Link>
                
                <div onClick={logoutHandler} className='flex gap-2 items-center px-6 py-2 hover:bg-gray-200 rounded-full cursor-pointer'>
                    <div><IoMdLogOut size={"25px"}/></div>
                    <h3 className='text-lg'>Logout</h3>
                </div>

                <button type='button' className='px-4 py-2 bg-blue-700 text-white w-full rounded-full text-lg'>Post</button>
            </div>
        </div>
    );
}

export default LeftSidebar;

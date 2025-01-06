import React from 'react';
import UseGetProfile from '../../hooks/UseGetProfile';
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/Constant';
import { refreshProfile,followOrUnfollow } from '../../redux/UserSclice';
import toast from 'react-hot-toast';
import { refreshTweet } from '../../redux/TweetSclice';
const Profile = () => {
    const param= useParams();
    UseGetProfile(param?.id);

    const {user,profile}= useSelector((state)=> {return state.user});
    console.log(user);
    const dispatch= useDispatch();
    const unfollowHandler = async(id,userId)=>{
        try {
            const res= await axios.post(`${USER_API_END_POINT}/unfollow/${id}`,
                {
                    userId,
                    one:"test",
                },
                {withCredentials:true}
        );

            if(res.data.success){
                toast.success(res.data.msg);
                dispatch(followOrUnfollow(id));
                dispatch(refreshTweet());
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    const followHandler = async(id,userId)=>{
        try {
            const res= await axios.post(`${USER_API_END_POINT}/follow/${id}`,
                {
                    userId,
                    one:"test",
                },
                {withCredentials:true}
        );

            if(res.data.success){
                toast.success(res.data.msg);
                dispatch(followOrUnfollow(id));
                dispatch(refreshTweet());

            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }
    return (
        <div className='w-[60%] relative'>
            <div className="bg h-52 w-full bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5W0_m4pCJhCts6Y7y-sAxWBz0_DsjOxoAt5_EIBuXBLiUTCF6-UYqjhAYcQgYix9zAdQ&usqp=CAU')]"></div>
            <div className='flex items-center justify-between px-3 mt-10'>
                <h3 className='font-bold text-lg'>@{profile?.username}</h3>
                {
                    user?._id == param?.id && (
                        <button type='button' className='px-6 py-1 bg-blue-700 text-white rounded-full'>Edit Profile</button> 
                    )
                }
                {
                    user?.followings.includes(param?.id) && (

                        <button type='button' onClick={()=> unfollowHandler(param?.id,user?._id)} className='px-6 py-1 bg-blue-700 text-white rounded-full'>UnFollow</button>
                    )
                }
                {
                    user?._id != param?.id && !(user.followings.includes(param?.id)) && (

                        <button type='button' onClick={()=> followHandler(param?.id,user?._id)} className='px-6 py-1 bg-blue-700 text-white rounded-full'>Follow</button>
                    )
                }
            </div>
            <div className='px-3'>
                webdev | hacking | netwoking | etc.
            </div>

            <div>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbxoDe9dHgOOQrjrJLHS8hVxlel89cFS95A&s"
                alt=""
                className="h-[100px] w-[100px] rounded-full absolute top-[40%] left-[20px]"
              />
            </div>
        </div>
    );
}

export default Profile;

import React, { useState } from 'react';
import { CiImageOn } from "react-icons/ci";
import Tweet from './Tweet';
import { useDispatch, useSelector} from 'react-redux';
import getAllTweet from '../../hooks/UseGetAllTweets';
import axios from 'axios';
import { TWEET_API_END_POINT } from '../../utils/Constant';
import toast from 'react-hot-toast';
import { refreshTweet,setisActive } from '../../redux/TweetSclice';
const Feed = () => {
    const [discription,setDiscription]= useState();
    const dispatch= useDispatch();
    const {user}= useSelector((state)=>{return state.user});

    // this is get all teets method
    getAllTweet(user?._id);
    const {allTweets,isActive}= useSelector((state)=>{return state.tweet});
    console.log(allTweets,isActive);
    const submitHandler= async()=>{
        try {
            const res= await axios.post(`${TWEET_API_END_POINT}/create`,{
                postText:discription,
                id:user._id,
            },{withCredentials:true})

            toast.success(res.data.msg);
            dispatch(refreshTweet());
            setDiscription("");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const followHandler= ()=>{
        dispatch(setisActive(false));
    }
    
    const followingHandler= ()=>{
        dispatch(setisActive(true));
    }

    return (
        <div className='w-[60%]'>
            <div className="tabs flex w-full justify-evenly border-b border-gray-200">
                <div onClick={()=>{ followHandler() }} className={`${!isActive? "border-b-2 border-blue-500": "border-b-2 border-transparent"} text-lg font-bold hover:bg-gray-200 w-[50%] px-4 py-2 text-center cursor-pointer`}>Following</div>
                <div onClick={()=>{ followingHandler() }} className={`${isActive ? "border-b-2 border-blue-500": "border-b-2 border-transparent"}text-lg font-bold hover:bg-gray-200 w-[50%] px-4 py-2 text-center cursor-pointer`}>For You</div>
            </div>
            <div className='h-[80vh] overscroll-y'>
            <div className="createpost flex gap-2 flex-col mt-2 border border-gray-200 rounded-sm p-2">
                <div className='flex items-center gap-1'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbxoDe9dHgOOQrjrJLHS8hVxlel89cFS95A&s" alt="" className='h-[40px] w-[40px] rounded-full' />
                    <input type="text" name="tweet" value={discription} onChange={(e)=> setDiscription(e.target.value)} id="" placeholder='What is happing?' className='text-lg outline-none border-none' />
                </div>
                <div className='flex items-center justify-between px-2'>
                    <div className='cursor-pointer'>
                        <CiImageOn size={"20px"}/>
                    </div>
                    <div>
                        <button type='button' className='px-6 py-1 bg-blue-700 text-white rounded-full' onClick={submitHandler}>Post</button>
                    </div>
                </div>
            </div>
            <div className="allpost">
                {
                ( allTweets && 
                    allTweets?.map((ele)=>{
                        return( <Tweet tweet={ele}/> )
                    })
                 )  
                }
            </div>
            </div>
        </div>
    );
}

export default Feed;

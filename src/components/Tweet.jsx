import React from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { CiRepeat } from "react-icons/ci";
import axios from "axios"
import {TWEET_API_END_POINT, USER_API_END_POINT} from "../../utils/Constant";
import {useSelector,useDispatch} from "react-redux";
import {refreshTweet} from "../../redux/TweetSclice"
import { MdDeleteOutline } from "react-icons/md";
import toast from 'react-hot-toast';
const Tweet = ({tweet}) => {
  const {user}= useSelector((state)=>{return state.user});
  const dispatch= useDispatch();
    const likeOrDislikeHandler = async (id)=>{
        try {
            const res= await axios.put(`${TWEET_API_END_POINT}/like/${id}`,
            {
                userid:user?._id,
            },{
                withCredentials:true,
            })

            if(res.data.success){
                dispatch(refreshTweet());
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const bookmarkHandler = async (id)=>{
        try {
            const res= await axios.post(`${USER_API_END_POINT}/bookmark/${id}`,
            {
                userid:user?._id,
            },{
                withCredentials:true,
            })

            if(res.data.success){
                dispatch(refreshTweet());
                toast.success(res.data.msg);
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }
    const deleteTweetHandle= async(id)=>{
        try {
            const res= await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`,{
                withCredentials:true,
            })

            if(res.data.success){
                toast.success(res.data.message);
                dispatch(refreshTweet());
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='border rounded-sm border-gray-200 mt-1 p-2'>
            <div className='flex items-center gap-1'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbxoDe9dHgOOQrjrJLHS8hVxlel89cFS95A&s" alt="" className='h-[40px] w-[40px] rounded-full' />
                    <h4>@{tweet?.userDetail?.username}</h4>
                    <p>2m ago</p>
            </div>
            <div>
                <div className='ml-12'>
                   {tweet?.discription}
                </div>
            </div>
            <div className="operation flex w-full items-center mt-2">
               <div className='ml-12 flex w-full items-center justify-between'>
               <div className='cursor-pointer flex justify-start bottom-2 gap-1 items-center' onClick={()=> likeOrDislikeHandler(tweet?._id)}>
                    <AiOutlineLike size={"20px"} className='rounded-full'/>
                    <p>{tweet?.likes?.length}</p>
                </div>
                <div onClick={()=> bookmarkHandler(tweet?._id)} className='cursor-pointer flex justify-start bottom-2 gap-1 items-center'>
                    <CiBookmark size={"20px"}/>
                    <p>{tweet?.bookmarks?.length}</p>
                </div>
                <div className='cursor-pointer flex justify-start bottom-2 gap-1 items-center'>
                    <FaRegComment size={"20px"}/>
                    <p>{tweet.comments.length}</p>
                </div>
                <div className='cursor-pointer flex justify-start bottom-2 gap-1 items-center'>
                    <CiRepeat size={"20px"}/>
                    <p>{tweet.retweets.length}</p>
                </div>
                {
                    user?._id == tweet?.userid ? 
                    (
                        <div className='cursor-pointer flex justify-start bottom-2 gap-1 items-center' onClick={()=> deleteTweetHandle(tweet?._id)}>
                    <MdDeleteOutline size={"20px"}/>
                </div>
                    ):
                    null
                }
                
               </div>
            </div>
        </div>
    );
}

export default Tweet;

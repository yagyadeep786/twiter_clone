import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { TWEET_API_END_POINT } from "../utils/Constant";
import { useEffect } from "react";
import { getAllTweets } from "../redux/TweetSclice";
import toast from "react-hot-toast";

const getAllTweet= (id)=>{
    const dispatch= useDispatch();
    const {refresh,isActive}= useSelector((state)=>{return state.tweet});
    const featchData= async()=>{
         try {
             const res= await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`,{withCredentials:true});
             dispatch(getAllTweets(res.data.alltweets));
         } catch (error) {
             toast.error(error.response.data.message);
         }

     }

     const followingTweets= async()=>{
        try {
            const res= await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`,{withCredentials:true});
            if(res.data.success){

                dispatch(getAllTweets(res.data.alltweets[0]));
            }
            console.log(res.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
    useEffect(()=>{
       !isActive ? featchData() : followingTweets();

    },[refresh,isActive])
}

export default getAllTweet;
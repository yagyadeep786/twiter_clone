import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { USER_API_END_POINT } from "../utils/Constant";
import { useEffect } from "react";
import { getOtherUser } from "../redux/UserSclice";
import toast from "react-hot-toast";

const getOhterUsers= (id)=>{
    const dispatch= useDispatch();
    useEffect(()=>{
       const featchData= async()=>{
            try {
                const res= await axios.get(`${USER_API_END_POINT}/otheruser/${id}`,{withCredentials:true});
                dispatch(getOtherUser(res.data.otherUsers));
            } catch (error) {
                toast.error(error.response.data.message);
            }

        }

        featchData();
    },[id])
}

export default getOhterUsers;
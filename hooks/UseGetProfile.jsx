import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { USER_API_END_POINT } from "../utils/Constant";
import { useEffect } from "react";
import { getMyProfile, refreshProfile } from "../redux/UserSclice";
import toast from "react-hot-toast";
const UseGetProfile= (id)=>{
    const {refresh}= useSelector((state)=> {return state.user });
    const dispatch= useDispatch();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res= await axios.get(`${USER_API_END_POINT}/profile/${id}`,{withCredentials:true});
                dispatch(getMyProfile(res.data.userData));
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        fetchProfile();
    }, [id,refresh]);
   
}

export default UseGetProfile;
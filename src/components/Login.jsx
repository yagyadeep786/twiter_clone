import React, { useState } from 'react';
import axios from "axios";
import {toast} from "react-hot-toast";
import { USER_API_END_POINT } from "../../utils/Constant"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/UserSclice';
const Login = () => {
    var [isLogin,setisLogin]= useState(false);
    const [username,setusername]= useState("");
    const [email,setemail]= useState("");
    const [password,setpassword]= useState("");
    const [confirmpassword,setconfirmpassword]= useState("");
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const formHandler= async(e)=>{
        e.preventDefault();
        if(isLogin){
            //login
            try {
                const res= await axios.post(`${USER_API_END_POINT}/login`,{
                    email,
                    password
                },{withCredentials:true});
                if(res.data.success){
                    toast.success(res.data.msg);
                    dispatch(getUser(res.data.userData));
                    navigate("/home")
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }else{
            //register
            try {
                const res= await axios.post(`${USER_API_END_POINT}/register`,{
                    username,
                    email,
                    password,
                    confirmpassword
                },{withCredentials:true})
                if(res.data.success){
                    toast.success(res.data.msg);
                    setisLogin(true);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    }
    const handleisLogin = ()=>{
        setisLogin(!isLogin);
    }
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='flex items-start gap-6'>
            <img src="https://img.freepik.com/premium-vector/twitter-new-x-logo-design-vector_1340851-70.jpg?semt=ais_hybrid" alt="logo" className='w-[15rem] ml-6' />
            <div>
                    <h2 className='text-lg font-bold ml-2'>{isLogin?"Login":"Create Account"}</h2>
                <form onSubmit={formHandler} action="" required className='flex flex-col gap-1 items-start w-[15rem]'>
                    {!isLogin && 
                     <> <input type="text" value={username} onChange={(e)=> setusername(e.target.value)} name="" id="" placeholder='Username' required className='px-2 py-1 outline-none border rounded-full w-full'/></>
                    }
                    <input type="text" name="" value={email} onChange={(e)=> setemail(e.target.value)}  id="" placeholder='Email' required className='px-2 py-1 outline-none border rounded-full w-full'/>
                    <input type="text" name="" value={password} onChange={(e)=> setpassword(e.target.value)}  id="" placeholder='Password' required className='px-2 py-1 outline-none border rounded-full w-full'/>
                    {!isLogin && 
                    <>
                    <input type="text" name="" value={confirmpassword} onChange={(e)=> setconfirmpassword(e.target.value)}  id="" placeholder='Comfirm Password' className='px-2 py-1 outline-none border rounded-full w-full'/> </> }
                    <button
              type="submit"
              className="px-4 py-2 w-full bg-black text-white rounded-full text-sm"
            >
              {isLogin?"Login":"Create Account"}
            </button>
                </form>
                <p>{isLogin?"Create Account If Not Have ":"Login If have Account "} <span className='text-blue-600 font-bold cursor-pointer' onClick={handleisLogin}>{isLogin?"Create Account":"Login"}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Login;

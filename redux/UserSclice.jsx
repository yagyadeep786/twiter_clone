import {createSlice} from "@reduxjs/toolkit";

const userSclice= createSlice({
    name:"user",
    initialState:{
        user:null,
        otherUser:null,
        profile:null,
        refresh:false,
        bookmarkTweets:null
    },
    reducers:{
        //actions hold
        getUser: (state,action)=>{
            state.user= action.payload;
        },
        getOtherUser:(state,action)=>{
            state.otherUser= action.payload;
        },
        getMyProfile:(state,action)=>{
            state.profile= action.payload;
        },
        refreshProfile:(state)=>{
            state.refresh= !state.refresh
        },
        followOrUnfollow:(state,action)=>{
            const id= action.payload;
            if(state.user.followings.includes(id)){
                //unfollow
                state.user.followings= state.user.followings.filter((ele)=> id != ele);
            }else{
                //follow
                state.user.followings.push(id);
            }
        },
        setbookmarkTweets:(state,action)=>{
            state.bookmarkTweets= action.payload;
        }
    }
})

export const {getUser,getOtherUser,getMyProfile,refreshProfile,followOrUnfollow,setbookmarkTweets} = userSclice.actions;
export default userSclice.reducer;
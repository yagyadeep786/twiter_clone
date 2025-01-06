import { createSlice } from "@reduxjs/toolkit";

const TweetSlice= createSlice({
    name:"tweet",
    initialState:{
        allTweets:null,
        followingTweet:null,
        refresh:false,
        isActive:false,
    },
    reducers:{
        getAllTweets:(state,action)=>{
            state.allTweets= action.payload;
        },
        refreshTweet:(state)=>{
            state.refresh= !state.refresh;
        },
        setisActive:(state,action)=>{
            state.isActive= action.payload;
        }
    }
})

export const {getAllTweets,refreshTweet,setisActive}= TweetSlice.actions;
export default TweetSlice.reducer;
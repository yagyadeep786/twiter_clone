import React from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from "./RightSidebar";
import {Outlet} from "react-router-dom"
const Home = () => {
    // I will add like and dislike in the app.
    return (
        <div className='flex justify-between mx-auto w-[80%]'>
            <LeftSidebar/>
            <Outlet/>
            <RightSidebar/>
        </div>
    );
}

export default Home;

import React from 'react';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from "./Home";
import Profile from './Profile';
import Login from "./Login";
import Feed from './Feed';
import Bookmark from './Bookmark';

const Body = () => {
    const approute= createBrowserRouter([
        {
            path:"/home",
            element:<Home/>,
            children:[
                {
                    path:"",
                    element:<Feed/>
                },
                {
                    path:"profile/:id",
                    element:<Profile/>
                },
                {
                    path:"bookmark",
                    element:<Bookmark/>
                }
            ]
        },
        {
            path:"/login",
            element:<Login/>
        }
    ])
    return (
            <RouterProvider router={approute}/>
    );
}

export default Body;

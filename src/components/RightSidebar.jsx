import React from "react";
import { CiSearch } from "react-icons/ci";
import getOhterUsers from "../../hooks/UseGetOtherusers";
import { useSelector,useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

const RightSidebar = () => {
  const {user,otherUser}= useSelector((state)=> {return state.user});
  getOhterUsers(user?._id);
  return (
    <div className="w-[25%] flex flex-col gap-2 p-2">
      <div className="search flex justify-start items-center px-3 py-1 rounded-full border border-gray-200 w-full gap-1">
        <input
          type="text"
          className="outline-none border-none"
          placeholder="Search"
        />
        <div className="cursor-pointer flex">
          <CiSearch size={"20px"} />
        </div>
      </div>
      <div className="users">
        <h2 className="text-lg font-bold ml-2">Who to Follow</h2>
        <div className="flex flex-col gap-1">
          {
            otherUser?.map((ele)=>{
              return(

                <Link to={"./profile/"+ele?._id}>
                  <div className="flex items-center justify-between px-1 cursor-pointer hover:bg-gray-300 p-1 rounded-md">
            <div className="flex items-center gap-1">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbxoDe9dHgOOQrjrJLHS8hVxlel89cFS95A&s"
                alt=""
                className="h-[40px] w-[40px] rounded-full"
              />
              <h4 className="text-sm">@{ele?.username}</h4>
            </div>
            <button
              type="button"
              className="px-4 py-1 bg-black text-white rounded-full text-sm"
            >
              Follow
            </button>
          </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;

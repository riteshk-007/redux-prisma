"use client";

import { udateUser, userInfo } from "@/app/redux/UserInfo";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userInfo(id));
  }, [id, dispatch]);

  const data = useSelector((state) => state.info.user.userInfo);

  useEffect(() => {
    setUserData(data);
  }, [data]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };
  const handleClick = () => {
    dispatch(udateUser(userData));
  };
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">User</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            value={userData?.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={userData?.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Old Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Old Password"
            value={userData?.oldPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="newPassword"
            type="password"
            placeholder="New Password"
            value={userData?.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Update
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Delete User
          </button>
        </div>
      </form>
    </div>
  );
};

export default User;

"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/userSlice";

const AddUser = () => {
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserDetail((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state?.users?.user?.undefined?.error);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(createUser(userDetail));
  };

  if (loading === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className=" mx-auto flex items-center justify-center flex-col my-4">
      <h1 className="text-4xl font-bold text-center text-blue-500">Add User</h1>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex flex-col space-y-4">
        <label htmlFor="name" className="font-bold text-lg">
          Name:
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={userDetail.name}
          onChange={handleChange}
          className="border-2 border-gray-300 p-2 rounded-md"
        />
        <label htmlFor="email" className="font-bold text-lg">
          Email:
        </label>
        <input
          id="email"
          type="text"
          placeholder="Email"
          value={userDetail.email}
          onChange={handleChange}
          className="border-2 border-gray-300 p-2 rounded-md"
        />
        <label htmlFor="password" className="font-bold text-lg">
          Password:
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={userDetail.password}
          onChange={handleChange}
          className="border-2 border-gray-300 p-2 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add User{" "}
        </button>
      </div>
      <Link
        href="/"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-4"
      >
        {" "}
        home{" "}
      </Link>
    </div>
  );
};

export default AddUser;

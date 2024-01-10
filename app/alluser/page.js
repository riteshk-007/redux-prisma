"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import Link from "next/link";

const AllUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { user, loading } = useSelector((state) => state.users);
  if (loading == "loading") {
    return (
      <>
        <h1>All User</h1>
        <div className="my-5 flex flex-col">
          <div className="flex flex-row border">
            <div className="w-1/3 mx-5">Name</div>
            <div className="w-1/3 mx-5">Email</div>
          </div>
          <div className="flex flex-row">
            <div className="flex w-96 flex-row border animate-pulse">
              <div className="w-full text-center font-semibold mx-5">
                Loading...
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>All User</h1>
      <div className="my-5 flex flex-col">
        <div className="flex flex-row border">
          <div className="w-1/3 mx-5">Name</div>
          <div className="w-1/3 mx-5">Email</div>
        </div>
        <div className="flex flex-col">
          {user &&
            user?.getData?.map((item) => {
              return (
                <Link
                  href={`/alluser/${item?.id}`}
                  key={item?.id}
                  className="flex w-96 flex-row border"
                >
                  <div className="w-1/3 mx-5">{item?.name}</div>
                  <div className="w-1/3 mx-5">{item?.email}</div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AllUser;

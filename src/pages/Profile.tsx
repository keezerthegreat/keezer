import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { usersData } from "../store/UsersData";
import { useNavigate } from "react-router";

const Profile = () => {
  const [users, setUsers] = useState<typeof usersData>();
  const snap = useSnapshot(usersData);
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");

  useEffect(() => {
    if (!id) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8000/users/" + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setUsers(resp);
      });
  }, []);

  return (
    <div className="flex justify-center py-12">
      <div className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg w-[400px] max-w-full">
        <h1 className="text-center text-2xl font-semibold text-gray-700 pb-6">Profile</h1>

        {/* User Info */}
        <section className="grid grid-cols-1 gap-6">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-500">Full Name</label>
            <input
              type="text"
              readOnly
              value={`${users?.firstName} ${users?.middleName} ${users?.lastName}`}
              className="border bg-gray-100 h-[40px] w-full py-2 px-3 rounded-md font-medium text-gray-700"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-500">Phone Number</label>
            <input
              type="number"
              readOnly
              value={users?.phoneNum}
              className="border bg-gray-100 h-[40px] w-full py-2 px-3 rounded-md font-medium text-gray-700"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-500">Username</label>
            <input
              type="text"
              readOnly
              value={users?.userName}
              className="border bg-gray-100 h-[40px] w-full py-2 px-3 rounded-md font-medium text-gray-700"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="text"
              readOnly
              value={users?.email}
              className="border bg-gray-100 h-[40px] w-full py-2 px-3 rounded-md font-medium text-gray-700"
            />
          </div>
        </section>

        {/* Edit Button */}
        <section className="flex justify-center mt-8">
          <button
            onClick={() => {
              usersData.confirmPassword = "";
              usersData.newPassword = "";
              navigate("/update-profile");
            }}
            type="button"
            className="w-[50%] py-2 px-4 text-white font-semibold bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-md shadow-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-200 ease-in-out"
          >
            Edit Profile
          </button>
        </section>
      </div>
    </div>
  );
};

export default Profile;

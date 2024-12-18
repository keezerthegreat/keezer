import React, { useEffect, useState } from "react";
import { usersData } from "../store/UsersData";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";

const UpdateProfile = () => {
  const user = useSnapshot(usersData);
  const navigate = useNavigate();

  const [users, setUsers] = useState<typeof usersData>();
  const [loading, setLoading] = useState(true);
  const id = sessionStorage.getItem("id");

  useEffect(() => {
    if (!id) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8000/users/" + id)
      .then((res) => res.json())
      .then((resp) => {
        setUsers(resp);
        setLoading(false);
        if (!resp.ok) {
          usersData.lastName = resp.lastName;
          usersData.firstName = resp.firstName;
          usersData.middleName = resp.middleName;
          usersData.userName = resp.userName;
          usersData.email = resp.email;
          usersData.phoneNum = resp.phoneNum;
        }
      })
      .catch(() => {
        alert("Error fetching user data.");
        navigate("/login");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!users) {
      alert("User data not loaded yet.");
      return;
    }

    const match = await bcrypt.compare(user.confirmPassword, users.password);

    if (match) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.newPassword, saltRounds);

      const updatedUser = {
        userName: user.userName,
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        phoneNum: user.phoneNum,
        email: user.email,
      };

      fetch(`http://localhost:8000/users/` + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      })
        .then((res) => {
          if (res.ok) {
            sessionStorage.removeItem("id");
            usersData.password = "";
            usersData.userName = "";
            alert("Profile updated successfully.");
            navigate("/login");
          } else {
            alert(`Error updating profile: ${res.status}`);
          }
        })
        .catch(() => {
          alert("An error occurred while updating the profile.");
        });
    } else {
      alert("Incorrect old password.");
    }
  };

  if (loading) return <div className="text-center py-20 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-[450px] max-w-lg"
      >
        <h1 className="text-2xl font-semibold text-center text-blue-600 pb-5">Update Profile</h1>

        <div className="space-y-4">
          <section className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-blue-600">Last Name</label>
              <input
                type="text"
                value={user.lastName}
                required
                onChange={(e) => usersData.lastName = e.target.value}
                className="border border-blue-500 w-full p-3 rounded-md text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-blue-600">First Name</label>
              <input
                type="text"
                required
                value={user.firstName}
                onChange={(e) => usersData.firstName = e.target.value}
                className="border border-blue-500 w-full p-3 rounded-md text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-blue-600">Middle Name</label>
              <input
                type="text"
                required
                value={user.middleName}
                onChange={(e) => usersData.middleName = e.target.value}
                className="border border-blue-500 w-full p-3 rounded-md text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-blue-600">Phone Number</label>
              <input
                type="text"
                value={user.phoneNum}
                required
                onChange={(e) => usersData.phoneNum = e.target.value}
                className="border border-blue-500 w-full p-3 rounded-md text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </section>

          <section>
            <label className="block text-sm font-semibold text-blue-600">Email</label>
            <input
              type="email"
              required
              value={user.email}
              onChange={(e) => usersData.email = e.target.value}
              className="border border-blue-500 w-full p-3 rounded-md text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </section>

          <section className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-blue-600">Confirm Old Password</label>
              <input
                required
                type="password"
                value={user.confirmPassword}
                onChange={(e) => usersData.confirmPassword = e.target.value}
                className="border border-blue-500 w-full p-3 rounded-md text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-blue-600">New Password</label>
              <input
                required
                type="password"
                value={user.newPassword}
                onChange={(e) => usersData.newPassword = e.target.value}
                className="border border-blue-500 w-full p-3 rounded-md text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </section>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="w-1/2 py-2 text-white bg-blue-600 hover:bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="w-1/2 py-2 text-white bg-gray-600 hover:bg-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;

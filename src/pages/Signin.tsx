import { useNavigate } from "react-router";
import { useSnapshot } from "valtio";
import { usersData } from "../store/UsersData";
import bcrypt from "bcryptjs";
import { useEffect, useState } from "react";

const Signin = () => {
  const snap = useSnapshot(usersData);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUserName = localStorage.getItem("rememberedUserName");

    if (savedUserName) {
      usersData.userName = savedUserName;
      setRememberMe(true);
    }
  }, []);

  const proceedSignin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("rememberedUserName", snap.userName);
    } else {
      localStorage.removeItem("rememberedUserName");
    }

    if (validate()) {
      try {
        const response = await fetch("http://localhost:8000/users");
        if (!response.ok) {
          alert("Failed to fetch user data.");
          return;
        }

        const users = await response.json();
        const user = users.find((u: { userName: string }) => u.userName === snap.userName);

        if (!user) {
          alert("User does not exist");
          return;
        }

        const passwordMatch = await bcrypt.compare(snap.password, user.password);

        if (!passwordMatch) {
          alert("Incorrect password");
          return;
        }

        sessionStorage.setItem("id", user.id); // Store the matched user's ID
        alert("Login Successfully");
        navigate("/"); // Navigate to home or dashboard
      } catch (error) {
        console.error("Error during sign-in:", error);
        alert("An error occurred while processing your request.");
      }
    }
  };

  const validate = () => {
    if (!snap.password) {
      alert("Enter Password");
      return false;
    }
    if (!snap.userName) {
      alert("Enter User Name");
      return false;
    }
    return true;
  };

  return (
    <div className="flex justify-center mt-24">
      <form onSubmit={proceedSignin} className="flex w-[500px] h-[400px] bg-white shadow-lg rounded-lg">
        <section className="flex flex-col w-[100%] p-8 gap-4">
          <h1 className="text-2xl font-bold text-blue-600">Sign In</h1>

          <div className="relative mb-4">
            <label className="text-sm text-gray-600 font-medium">Username</label>
            <input
              type="text"
              required
              value={snap.userName}
              onChange={(e) => { usersData.userName = e.target.value; }}
              className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative mb-4">
            <label className="text-sm text-gray-600 font-medium">Password</label>
            <input
              type="password"
              required
              value={snap.password}
              onChange={(e) => { usersData.password = e.target.value; }}
              className="w-full px-4 py-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-2">Remember Me</span>
            </label>
            <button
              type="button"
              onClick={() => { navigate("/login/forgot-password"); }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700"
          >
            Sign In
          </button>
        </section>

        <section className="flex flex-col items-center justify-center bg-blue-100 w-[40%] p-8">
          <h2 className="text-lg font-bold text-blue-600">New to our platform?</h2>
          <p className="text-sm text-gray-600">Create an account to get started.</p>
          <button
            type="button"
            onClick={() => {
              usersData.userName = "";
              usersData.password = "";
              navigate("/login/signup");
            }}
            className="mt-4 border p-2 rounded-md font-medium text-blue-600 border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Sign Up
          </button>
        </section>
      </form>
    </div>
  );
};

export default Signin;

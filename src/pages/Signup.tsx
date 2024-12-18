import { useSnapshot } from "valtio";
import { usersData } from "../store/UsersData";
import { useNavigate } from "react-router";
import bcrypt from "bcryptjs";

const Signup = () => {
  const snap = useSnapshot(usersData);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Updated regex for password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(snap.password)) {
      alert(
        "Password must be at least 8 characters long, include one uppercase letter, and one number."
      );
    } else {
      if (snap.password === snap.confirmPassword) {
        const resp = await fetch("http://localhost:8000/users");
        const users = await resp.json();

        const userExists = users.some(
          (user: { userName: string }) => user.userName === snap.userName
        );

        if (!userExists) {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(snap.password, saltRounds); // Use snap.password for hashing
          usersData.password = hashedPassword;

          const res = await fetch("http://localhost:8000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usersData),
          });

          if (res.ok) {
            // Clear form fields after successful registration
            usersData.userName = "";
            usersData.firstName = "";
            usersData.lastName = "";
            usersData.middleName = "";
            usersData.phoneNum = "";
            usersData.email = "";
            usersData.password = "";
            usersData.confirmPassword = "";
            alert("Registered Successfully");
            navigate("/login");
          } else {
            alert(`Error: ${res.status}`);
          }
        } else {
          alert("User Already Exists");
        }
      } else {
        alert("Passwords do not match.");
      }
    }
  };

  return (
    <div className="flex justify-center mt-20">
      {/* Sign up form */}
      <form
        onSubmit={handleSubmit}
        className="flex w-[500px] h-[auto] items-center p-8 shadow-lg rounded-lg border border-gray-300"
      >
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Sign Up</h1>
          <section className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600">First Name</label>
              <input
                type="text"
                required
                value={snap.firstName}
                onChange={(e) => {
                  usersData.firstName = e.target.value;
                }}
                className="border border-gray-300 rounded-md p-2 mt-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600">Last Name</label>
              <input
                type="text"
                required
                value={snap.lastName}
                onChange={(e) => {
                  usersData.lastName = e.target.value;
                }}
                className="border border-gray-300 rounded-md p-2 mt-1"
              />
            </div>
          </section>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">User Name</label>
            <input
              type="text"
              required
              value={snap.userName}
              onChange={(e) => {
                usersData.userName = e.target.value;
              }}
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              type="number"
              value={snap.phoneNum}
              onChange={(e) => {
                usersData.phoneNum = e.target.value;
              }}
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              required
              value={snap.email}
              onChange={(e) => {
                usersData.email = e.target.value;
              }}
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              required
              value={snap.password}
              onChange={(e) => {
                usersData.password = e.target.value;
              }}
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              required
              value={snap.confirmPassword}
              onChange={(e) => {
                usersData.confirmPassword = e.target.value;
              }}
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              required
              id="checkbox"
              className="h-4 w-4"
            />
            <label htmlFor="checkbox" className="text-sm text-gray-600">
              I agree to the terms and conditions
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-500 duration-200"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="text-blue-600 hover:text-blue-500"
            >
              Log In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;

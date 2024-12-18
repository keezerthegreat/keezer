import { useSnapshot } from "valtio";
import { usersData } from "../store/UsersData";
import { useNavigate, useParams } from "react-router";
import bcrypt from "bcryptjs";

const ForgotPassword = () => {
  const snap = useSnapshot(usersData);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/users");

      if (!response.ok) {
        alert("Failed to fetch user data.");
        return;
      }

      const users = await response.json();
      console.log(users); // Debug the structure of the returned data

      // Find the user based on `userName` and `recoveryPass`
      const user = users.find(
        (user: { id: string; userName: string; recoveryPass: string }) =>
          user.userName === snap.userName ||
          user.recoveryPass === snap.recoveryPass
      );

      if (!user) {
        alert("User does not exist or recovery information is incorrect");
        return;
      }

      // Extract user ID from the found user
      const { id } = user;

      // Hash the new password
      if (snap.newPassword === snap.confirmPassword) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(snap.newPassword, saltRounds);

        // Update password for the user
        const res = await fetch(`http://localhost:8000/users/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: hashedPassword,
          }),
        });

        if (res.ok) {
          usersData.password = "";
          usersData.userName = "";
          usersData.confirmPassword = "";
          usersData.newPassword = "";
          navigate("/login");
          alert("Password Successfully Changed");
        } else {
          alert("Error Occurred while updating the password.");
        }
      } else {
        alert("Passwords does not match");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <div className="flex justify-center mt-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-md border shadow-md w-[400px]"
      >
        <section className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              usersData.userName = "";
              usersData.password = "";
              usersData.newPassword = "";
              usersData.confirmPassword = "";
              navigate("/login");
            }}
            className="font-bold mb-3 hover:bg-red-100 px-2 rounded-md hover:text-red-500 duration-200"
          >
            X
          </button>
        </section>
        <h1 className="text-center pb-6 font-bold">Forgot Password</h1>
        <section className="grid grid-cols-1 gap-5">
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
              User Name
            </p>
            <input
              type="text"
              required
              value={snap.userName}
              onChange={(e) => {
                usersData.userName = e.target.value;
              }}
              className="border border-slate-500 h-[35px] w-[100%] py-1 rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
              Recovery Word
            </p>
            <input
              type="text"
              required
              value={snap.password}
              onChange={(e) => {
                usersData.password = e.target.value;
              }}
              className="border border-slate-500 h-[35px] w-[100%] py-1 rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
              New Password
            </p>
            <input
              type="password"
              required
              value={snap.newPassword}
              onChange={(e) => {
                usersData.newPassword = e.target.value;
              }}
              className="border border-slate-500 h-[35px] w-[100%] py-1 rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
          <span className="relative rounded-lg">
            <p className="text-xs font-bold absolute text-slate-600 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
              Confirm Password
            </p>
            <input
              type="password"
              required
              value={snap.confirmPassword}
              onChange={(e) => {
                usersData.confirmPassword = e.target.value;
              }}
              className="border border-slate-500 h-[35px] w-[100%] py-1 rounded-md font-bold text-center overflow-hidden px-1 "
            />
          </span>
          <button className="bg-red-500 font-bold text-white py-1 shadow-md shadow-red-500/50 rounded-md hover:bg-green-500 hover:shadow-green-400/50 active:shadow duration-200">
            Submit
          </button>
        </section>
      </form>
    </div>
  );
};

export default ForgotPassword;

import { useNavigate } from "react-router";
import { usersData } from "../store/UsersData";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center py-4 px-6 fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <section className="flex gap-8 items-center">
        <button
          onClick={() => {
            navigate("/");
          }}
          type="button"
          className="text-base text-blue-600 font-medium transition-all duration-200 hover:text-blue-800 hover:underline"
        >
          Home
        </button>

        <button
          onClick={() => {
            navigate("/profile");
          }}
          type="button"
          className="text-base text-blue-600 font-medium transition-all duration-200 hover:text-blue-800 hover:underline"
        >
          Profile
        </button>

        <button
          onClick={() => {
            navigate("/archived");
          }}
          type="button"
          className="text-base text-blue-600 font-medium transition-all duration-200 hover:text-blue-800 hover:underline"
        >
          Archived
        </button>

        <button
          onClick={() => {
            sessionStorage.removeItem("id");
            usersData.password = "";
            navigate("/login");
          }}
          type="button"
          className="text-base text-blue-600 font-medium transition-all duration-200 hover:text-blue-800 hover:underline"
        >
          Logout
        </button>
      </section>
    </div>
  );
};

export default Navbar;

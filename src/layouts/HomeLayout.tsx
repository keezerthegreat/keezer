import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-32">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;

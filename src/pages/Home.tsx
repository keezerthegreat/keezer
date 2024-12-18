import { useEffect } from "react";
import { useNavigate } from "react-router";
import Students from "../components/students/Students";

const Home = () => {
  const navigate = useNavigate();

  const id = sessionStorage.getItem("id");

  useEffect(() => {
    if (!id) {
      navigate("/login");
      return;
    }
  }, [id, navigate]);

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">Welcome to the Student Portal</h1>
          <p className="mt-2 text-lg">Manage and view all students easily</p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Title */}
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Student Dashboard</h2>

          {/* Students Component */}
          <Students />

          {/* Footer Section */}
          <footer className="bg-white py-4 mt-8">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
              <p>&copy; 2024 Student Portal. All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Home;

import { useSnapshot } from "valtio";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { archiveData } from "../store/ArchiveData";
import { usersData } from "../store/UsersData";
import { studentData } from "../store/StudentData";
import ViewStudents from "../components/students/ViewStudents";

const ArchivedStudents = () => {
  const [students, setStudents] = useState<(typeof archiveData)[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] =
    useState<(typeof archiveData)[]>();
  const open = useSnapshot(usersData);
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");
  let { userId } = useParams();

  // Fetch archived students from the backend
  const fetchStudents = () => {
    fetch("http://localhost:8000/archive/" + userId)
      .then((res) => res.json())
      .then((resp) => {
        setStudents(resp);
        setFilteredStudents(resp);
      })
      .catch((err) => {
        alert("An error occurred: " + err.message);
      });
  };

  // Handle search logic
  const handleSearch = () => {
    if (!students) return;

    const filtered = students.filter((student) => {
      const fullName =
        `${student.lastName} ${student.firstName} ${student.middleName}`.toLowerCase();
      const email = student.email.toLowerCase();
      const search = searchTerm.toLowerCase();

      return fullName.includes(search) || email.includes(search);
    });

    setFilteredStudents(filtered);
  };

  // Handle the deletion of a student
  const handleDelete = (studentId: string) => {
    fetch(`http://localhost:8000/archive/${studentId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        // Update the state to remove the deleted student
        const updatedStudents = students?.filter(
          (student) => student.id !== studentId
        );
        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents); // Update filtered students as well
      })
      .catch((err) => {
        alert("Failed to delete student: " + err.message);
      });
  };

  useEffect(() => {
    if (!id) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8000/archive")
      .then((res) => res.json())
      .then((resp) => {
        setStudents(resp);
        setFilteredStudents(resp);
      })
      .catch(() => {
        alert("Failed to fetch Students");
      });
  }, [id]);

  return (
    <div className="flex justify-center">
      <div className="bg-white p-10 rounded-lg shadow-md">
        <span className="flex flex-col items-center">
          <section className="flex justify-evenly w-[100%]">
            <button
              type="button"
              onClick={() => {
                usersData.open = false;
              }}
              className="p-1 opacity-0 hover:cursor-default text-white rounded-md font-bold w-[200px] bg-gradient-to-b from-blue-500 to-blue-400 hover:from-blue-300 hover:to-blue-500 active:shadow duration-200 shadow-md"
            >
              Add Student
            </button>
            <h1 className="text-center font-bold text-lg w-[100%] text-blue-600">
              All Students
            </h1>
            <section className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-1 w-[150px] rounded-l-md border-2 border-blue-500 text-center"
              />
              <button
                onClick={handleSearch}
                className="p-1 border-2 border-blue-500 bg-blue-500 font-bold text-white rounded-r-md hover:text-blue-200 duration-200"
              >
                Search
              </button>
            </section>
          </section>
          <span className="flex justify-between items-center w-[100%]">
            <section className="grid grid-cols-3 w-[800px] my-5 text-blue-600">
              <h1 className="font-semibold text-start">Full Name</h1>
              <h1 className="font-semibold text-center pr-14">Sex</h1>
              <h1 className="font-semibold text-start">Email</h1>
            </section>
          </span>
        </span>
        <div className="flex flex-col gap-2 items-center w-[1000px] h-[350px] overflow-auto no-scrollbar">
          {/* Display All Students */}
          <span className="flex flex-col justify-center w-[100%]">
            {filteredStudents?.map((student) => (
              <form
                key={student.id}
                className="flex justify-between items-center"
              >
                <section className="grid grid-cols-3 w-[100%] border-b-2 hover:border-b-blue-400 duration-200 py-2 mr-5">
                  <p className="text-start text-blue-600">
                    {student?.lastName}, {student?.firstName} {student?.middleName}
                  </p>
                  <p className="text-center text-blue-600">{student?.sex}</p>
                  <p className="text-start text-blue-600">{student?.email}</p>
                </section>
                <section className="flex py-2">
                  <button
                    onClick={() => handleDelete(student.id)}
                    type="button"
                    className="px-3 py-1 bg-blue-400 shadow-md text-white font-bold rounded-md hover:bg-blue-500 duration-200 mx-1"
                  >
                    Delete
                  </button>
                </section>
              </form>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArchivedStudents;

import { useSnapshot } from "valtio";
import { studentData } from "../../store/StudentData";
import AddStudents from "./AddStudents";
import { usersData } from "../../store/UsersData";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UpdateStudents from "./UpdateStudents";
import ViewStudents from "./ViewStudents";

const Students = () => {
  const [students, setStudents] = useState<(typeof studentData)[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] =
    useState<(typeof studentData)[]>();
  const student = useSnapshot(studentData);
  const open = useSnapshot(usersData);
  let { id } = useParams<string>();
  const navigate = useNavigate();
  const snap = useSnapshot(studentData);

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:8000/students");
      const students: (typeof studentData)[] = await response.json();

      const studentExists: boolean = students.some(
        (student: {
          firstName: string;
          lastName: string;
          middleName: string;
        }) =>
          student.firstName === snap.firstName &&
          student.lastName === snap.lastName &&
          student.middleName === snap.middleName
      );

      if (studentExists) {
        alert("Student already exists");
      } else {
        const res = await fetch("http://localhost:8000/students/" + snap.id, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });

        if (res.ok) {
          alert("Successfully Updated Student");
        } else {
          alert("Error Occurred");
        }
      }
    } catch (error) {
      alert("An error occurred while fetching or submitting data.");
    }
  };

  const fetchStudents = () => {
    fetch("http://localhost:8000/students/" + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        studentData.lastName = resp?.lastName;
        studentData.firstName = resp?.firstName;
        studentData.middleName = resp?.middleName;
        studentData.email = resp?.email;
        studentData.sex = resp?.sex;
      })
      .catch((err) => {
        alert("An Error Occured : " + err.message);
      });
  };

  const storeArchive = async () => {
    await fetch("http://localhost:8000/students/" + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        studentData.id = resp.id;
        studentData.lastName = resp.lastName;
        studentData.firstName = resp.firstName;
        studentData.middleName = resp.middleName;
        studentData.email = resp.email;
        studentData.sex = resp.sex;
      });

    const res = await fetch("http://localhost:8000/archive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    });
    if (res.ok) {
    } else {
      alert("Error Occured");
    }
  };

  const handleDelete = async () => {
    const res = await fetch("http://localhost:8000/students/" + id, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("Successfully Deleted Student");
    } else {
      alert("Error Occured");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/students");
      const students: (typeof studentData)[] = await response.json();

      const studentExists: boolean = students.some(
        (student: {
          firstName: string;
          lastName: string;
          middleName: string;
        }) =>
          student.firstName === snap.firstName &&
          student.lastName === snap.lastName &&
          student.middleName === "" &&
          student.middleName === snap.middleName
      );

      if (studentExists) {
        alert("Student already exists");
      } else {
        studentData.id = String(Math.random().valueOf());
        const res = await fetch("http://localhost:8000/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });

        if (res.ok) {
          alert("Successfully Added Student");
        } else {
          alert("Error Occurred");
        }
      }
    } catch (error) {
      alert("An error occurred while fetching or submitting data.");
    }
  };

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

  useEffect(() => {
    fetch("http://localhost:8000/students")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setStudents(resp);
        setFilteredStudents(resp);
      })
      .catch(() => {
        alert("Failed to fetch Students");
      });
  }, []);

  return (
    <div className="flex justify-center">
      <div className="bg-blue-100 p-10 rounded-lg shadow-md">
        <span className="flex flex-col items-center ">
          <section className="flex justify-evenly w-[100%]">
            <button
              type="button"
              onClick={() => {
                usersData.open = false;
              }}
              className="p-1 text-white rounded-md font-bold hover:cursor-pointer w-[200px] bg-gradient-to-b from-blue-500 to-blue-400 hover:from--600 hover:to-blue-500 active:shadow duration-200 shadow-md"
            >
              ADD STUDENT
            </button>
            <h1 className="text-center font-bold text-lg w-[100%]">
              STUDENT DETAILS
            </h1>
            <section className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-1 w-[150px] rounded-l-md border-2 border-blue-400 text-center"
              />
              <button
                onClick={handleSearch}
                className="p-1 border-2 border-blue-400 bg-blue-500 font-bold text-white rounded-r-md hover:text-blue-200 duration-200"
              >
                Search
              </button>
            </section>
          </section>
          <span className="flex justify-between items-center w-[100%]">
            <section className="grid grid-cols-3 w-[800px] my-5">
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
                  <p className="text-start">
                    {student?.lastName}, {student?.firstName}{" "}
                    {student?.middleName}
                  </p>
                  <p className="text-center">{student?.sex}</p>
                  <p className="text-start">{student?.email}</p>
                </section>
                <section className="flex py-2">
                  <button
                    type="button"
                    onClick={() => {
                      id = student?.id;
                      studentData.id = student?.id;
                      usersData.open2 = false;
                      fetchStudents();
                    }}
                    className="px-3 py-1 bg-blue-400 shadow-md text-white font-bold rounded-md hover:bg-green-500 duration-200 mx-1"
                  >
                    UPDATE
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      id = student?.id;
                      storeArchive();
                      handleDelete();
                    }}
                    className="px-3 py-1 bg-blue-400 shadow-md text-white font-bold rounded-md hover:bg-red-500 duration-200 mx-1"
                  >
                    DELETE
                  </button>
                  <button
                    onClick={() => {
                      id = student?.id;
                      usersData.open3 = false;
                      fetchStudents();
                    }}
                    type="button"
                    className="px-3 py-1 bg-blue-400 shadow-md text-white font-bold rounded-md hover:bg-green-500 duration-200 mx-1"
                  >
                    VIEW
                  </button>
                </section>
              </form>
            ))}
          </span>

          {/* Add Students */}

          <form
            onSubmit={handleSubmit}
            className={`${open.open
              ? "opacity-0 w-0 left-0 top-1/2"
              : "w-[400px] opacity-100"
              } bg-blue-50 p-10 rounded-md border shadow-md flex flex-col absolute items-center overflow-hidden`}
          >
            <section className="flex justify-between w-[100%] items-center">
              <h1 className="font-bold pb-7 text-lg text-center">
                ADD STUDENT
              </h1>
              <button
                type="button"
                onClick={() => {
                  usersData.open = true;
                }}
                className="mb-7 font-bold py-1 px-3 rounded-md hover:text-blue-500 duration-200 hover:bg-blue-100"
              >
                X
              </button>
            </section>
            <AddStudents />
            <button
              type="submit"
              className="p-1 text-white mt-5 rounded-md font-bold hover:cursor-pointer w-[68%] bg-gradient-to-b from-blue-500 to-blue-400  hover:from-blue-600 hover:to-blue-500 active:shadow duration-200 shadow-md"
            >
              ADD
            </button>
          </form>

          {/* Update Students */}

          <form
            onSubmit={handleUpdate}
            className={`${open.open2
              ? "opacity-0 w-0 left-0 top-1/2"
              : "w-[400px] opacity-100"
              } bg-blue-50 p-10 rounded-md border shadow-md flex flex-col absolute items-center overflow-hidden`}
          >
            <section className="flex justify-between w-[100%] items-center">
              <h1 className="font-bold pb-7 text-lg text-center">
                UPDATE STUDENT
              </h1>
              <button
                type="button"
                onClick={() => {
                  studentData.lastName = "";
                  studentData.firstName = "";
                  studentData.middleName = "";
                  studentData.email = "";
                  studentData.sex = "";
                  usersData.open2 = true;
                }}
                className="mb-7 font-bold py-1 px-3 rounded-md hover:text-blue-500 duration-200 hover:bg-blue-100"
              >
                X
              </button>
            </section>
            <UpdateStudents />
            <button
              type="submit"
              className="p-1 text-white mt-5 rounded-md font-bold hover:cursor-pointer w-[68%] bg-gradient-to-b from-blue-500 to-blue-400  hover:from-blue-600 hover:to-blue-500 active:shadow duration-200 shadow-md"
            >
              UPDATE
            </button>
          </form>

          {/* View Students */}

          <form
            className={`${open.open3
              ? "opacity-0 w-0 left-0 top-1/2"
              : "w-[400px] opacity-100"
              } bg-blue-50 p-10 rounded-md border shadow-md flex flex-col absolute items-center overflow-hidden`}
          >
            <section className="flex justify-between w-[100%] items-center">
              <h1 className="font-bold pb-7 text-lg text-center">
                STUDENT INFORMATION
              </h1>
              <button
                type="submit"
                onClick={() => {
                  usersData.open3 = true;
                }}
                className="mb-7 font-bold py-1 px-3 rounded-md hover:text-blue-500 duration-200 hover:bg-blue-100"
              >
                X
              </button>
            </section>
            <ViewStudents />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Students;

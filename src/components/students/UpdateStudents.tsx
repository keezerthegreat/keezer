import { useSnapshot } from "valtio";
import { studentData } from "../../store/StudentData";
import { useEffect } from "react";

const UpdateStudents = () => {
  const snap = useSnapshot(studentData);

  return (
    <div className="flex flex-col gap-4">
      <section className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-xs font-medium text-blue-500 mb-1">
            Last Name
          </label>
          <input
            type="text"
            required
            value={snap.lastName}
            onChange={(e) => {
              studentData.lastName = e.target.value;
            }}
            className="w-full border-b border-blue-500 bg-transparent py-2 px-3 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
          />
        </div>

        <div className="relative">
          <label className="block text-xs font-medium text-blue-500 mb-1">
            First Name
          </label>
          <input
            type="text"
            required
            value={snap.firstName}
            onChange={(e) => {
              studentData.firstName = e.target.value;
            }}
            className="w-full border-b border-blue-500 bg-transparent py-2 px-3 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
          />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-xs font-medium text-blue-500 mb-1">
            Middle Name
          </label>
          <input
            type="text"
            value={snap.middleName}
            onChange={(e) => {
              studentData.middleName = e.target.value;
            }}
            className="w-full border-b border-blue-500 bg-transparent py-2 px-3 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
          />
        </div>

        <div className="relative">
          <label className="block text-xs font-medium text-blue-500 mb-1">
            Sex
          </label>
          <select
            value={snap.sex}
            onChange={(e) => {
              studentData.sex = e.target.value;
            }}
            className="w-full border-b border-blue-500 bg-transparent py-2 px-3 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
          >
            <option value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </section>

      <div className="relative">
        <label className="block text-xs font-medium text-blue-500 mb-1">
          Email
        </label>
        <input
          type="email"
          required
          value={snap.email}
          onChange={(e) => {
            studentData.email = e.target.value;
          }}
          className="w-full border-b border-blue-500 bg-transparent py-2 px-3 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
        />
      </div>
    </div>
  );
};

export default UpdateStudents;

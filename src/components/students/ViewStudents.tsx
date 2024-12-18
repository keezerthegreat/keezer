import { useSnapshot } from "valtio";
import { studentData } from "../../store/StudentData";
import { useEffect } from "react";

const ViewStudents = () => {
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
            readOnly
            value={snap.lastName}
            className="w-full border-b border-blue-500 bg-transparent py-2 px-3 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
          />
        </div>

        <div className="relative">
          <label className="block text-xs font-medium text-blue-500 mb-1">
            First Name
          </label>
          <input
            type="text"
            readOnly
            value={snap.firstName}
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
            readOnly
            value={snap.middleName}
            className="w-full border-b border-blue-500 bg-transparent py-2 px-3 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
          />
        </div>

        <div className="relative">
          <label className="block text-xs font-medium text-blue-500 mb-1">
            Sex
          </label>
          <input
            type="text"
            readOnly
            value={snap.sex}
            className="w-full border-b border-blue-500 bg-transparent py-2 px-3 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
          />
        </div>
      </section>

      <div className="relative">
        <label className="block text-xs font-medium text-blue-500 mb-1">
          Email
        </label>
        <input
          type="email"
          readOnly
          value={snap.email}
          className="w-full border-b border-blue-500 bg-transparent py-2 px-3 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
        />
      </div>
    </div>
  );
};

export default ViewStudents;

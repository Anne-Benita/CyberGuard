import React, { useState } from "react";

const Usermanagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Atem E.", role: "Admin", status: "Active" },
    { id: 2, name: "SOC Analyst 1", role: "Analyst", status: "Active" }
  ]);

  const toggleStatus = (id) => {
    setUsers(
      users.map(u =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
      )
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-slate-800 dark:text-white">
        User Management
      </h2>
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-600 dark:text-slate-300 text-sm">
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b last:border-0 border-slate-200 dark:border-slate-700">
              <td className="py-2 text-slate-800 dark:text-white">{user.name}</td>
              <td>
                <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                  {user.role}
                </span>
              </td>
              <td>
                <span className={user.status === "Active" ? "text-green-600" : "text-red-600"}>
                  ● {user.status}
                </span>
              </td>
              <td>
                <button
                  onClick={() => toggleStatus(user.id)}
                  className="text-xs bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 p-1 rounded"
                >
                  Toggle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usermanagement;

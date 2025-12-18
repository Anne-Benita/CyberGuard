import React, { useState } from "react";

const Auditlogs = () => {
  const [logs] = useState([
    { id: 101, action: "File Upload", user: "SOC Analyst 1", time: "2025-02-18 09:00", severity: "Info" },
    { id: 102, action: "Failed Login", user: "Unknown", time: "2025-02-18 09:15", severity: "Critical" }
  ]);

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow max-h-96 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-red-700 dark:text-red-400">Audit Logs</h2>
      {logs.map(log => (
        <div
          key={log.id}
          className={`mb-3 p-2 border-l-4 rounded ${
            log.severity === "Critical"
              ? "border-red-500 bg-red-50 dark:bg-red-900/30"
              : "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
          }`}
        >
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
            <span className="font-bold text-slate-800 dark:text-white">{log.action}</span>
            <span>{log.time}</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-200">User: {log.user}</p>
          <p className="text-xs text-slate-700 dark:text-slate-200">Severity: {log.severity}</p>
        </div>
      ))}
    </div>
  );
};

export default Auditlogs;

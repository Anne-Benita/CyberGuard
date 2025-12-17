import React from "react";

function Reports() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
        Threat Reports
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-slate-500 dark:text-slate-400">Total Incidents</p>
          <h4 className="text-3xl font-bold text-slate-800 dark:text-white">
            1,248
          </h4>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-slate-500 dark:text-slate-400">High Severity</p>
          <h4 className="text-3xl font-bold text-red-600">312</h4>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
          <p className="text-slate-500 dark:text-slate-400">Resolved</p>
          <h4 className="text-3xl font-bold text-green-600">864</h4>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
          Export PDF
        </button>
        <button className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 dark:text-white">
          Export CSV
        </button>
      </div>
    </div>
  );
}

export default Reports;

import React from "react";

const incidents = [
  { id: 1, title: "Malware Beaconing", severity: "High", status: "Open", time: "2 mins ago" },
  { id: 2, title: "Suspicious Login", severity: "Medium", status: "Investigating", time: "10 mins ago" },
  { id: 3, title: "DDoS Attempt", severity: "Critical", status: "Contained", time: "1 hour ago" },
];

export default function IncidentTracker() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
        Incident Tracker
      </h2>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
            <tr>
              <th className="p-4 text-left">Incident</th>
              <th className="p-4">Severity</th>
              <th className="p-4">Status</th>
              <th className="p-4">Detected</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(i => (
              <tr key={i.id} className="border-t dark:border-slate-700">
                <td className="p-4 text-slate-800 dark:text-white">{i.title}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${i.severity === "Critical" && "bg-red-100 text-red-700"}
                    ${i.severity === "High" && "bg-orange-100 text-orange-700"}
                    ${i.severity === "Medium" && "bg-yellow-100 text-yellow-700"}
                  `}>
                    {i.severity}
                  </span>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-300">{i.status}</td>
                <td className="p-4 text-slate-500">{i.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

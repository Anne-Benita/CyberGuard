import React from "react";
import { MoreHorizontal } from "lucide-react";

const cyberThreatData = [
  {
    CVE_ID: "CVE-2025-1123",
    Geo_Country: "USA",
    Threat_Name: "SQL Injection Attack",
    Timestamp: "2025-10-10 09:25:45",
    Severity_Level: "High",
    Source_IP: "192.168.1.101",
    Destination_IP: "10.0.0.45",
    Action_Taken: "Blocked",
    Protocol: "HTTP",
    Target_Port: 443,
    Malware_Family: "None",
  },
  {
    CVE_ID: "CVE-2025-2244",
    Geo_Country: "China",
    Threat_Name: "Brute Force Attack",
    Timestamp: "2025-10-10 08:50:12",
    Severity_Level: "Critical",
    Source_IP: "172.16.0.55",
    Destination_IP: "10.0.0.20",
    Action_Taken: "Isolated",
    Protocol: "SSH",
    Target_Port: 22,
    Malware_Family: "Hydra",
  },
  {
    CVE_ID: "CVE-2025-3345",
    Geo_Country: "Germany",
    Threat_Name: "Phishing Attempt",
    Timestamp: "2025-10-10 08:30:00",
    Severity_Level: "Medium",
    Source_IP: "203.0.113.10",
    Destination_IP: "10.0.0.30",
    Action_Taken: "Alerted",
    Protocol: "SMTP",
    Target_Port: 25,
    Malware_Family: "Emotet",
  },
  {
    CVE_ID: "CVE-2025-4456",
    Geo_Country: "Brazil",
    Threat_Name: "Trojan Injection",
    Timestamp: "2025-10-10 08:15:00",
    Severity_Level: "Low",
    Source_IP: "192.0.2.5",
    Destination_IP: "10.0.0.60",
    Action_Taken: "Monitored",
    Protocol: "TCP",
    Target_Port: 8080,
    Malware_Family: "AgentTesla",
  },
  {
    CVE_ID: "CVE-2025-5567",
    Geo_Country: "India",
    Threat_Name: "Malware Download Attempt",
    Timestamp: "2025-10-10 07:45:00",
    Severity_Level: "High",
    Source_IP: "198.51.100.33",
    Destination_IP: "10.0.0.70",
    Action_Taken: "Quarantined",
    Protocol: "HTTPS",
    Target_Port: 443,
    Malware_Family: "TrickBot",
  },
];

function TableSection() {
  const getSeverityColor = (level) => {
    switch (level) {
      case "Critical":
        return "bg-red-500/20 text-red-500";
      case "High":
        return "bg-orange-500/20 text-orange-500";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-500";
      case "Low":
        return "bg-green-500/20 text-green-500";
      default:
        return "bg-slate-200/20 text-slate-400";
    }
  };

  return (
    <div
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
      rounded-2xl border border-slate-200/50 dark:border-slate-700/50 
      max-h-[500px] flex flex-col"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex-shrink-0">
        <div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
            Recent Alerts
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Latest Security Alerts
          </p>
        </div>
        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          View All
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-y-auto overflow-x-auto flex-grow">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800 z-10">
            <tr>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                CVE_ID
              </th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                Geo_Country
              </th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                Threat_Name
              </th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                Timestamp
              </th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                Severity_Level
              </th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                Source_IP
              </th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                Destination_IP
              </th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                Action_Taken
              </th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                Protocol
              </th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                Target_Port
              </th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                Malware_Family
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {cyberThreatData.map((order, index) => (
              <tr
                key={index}
                className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="p-4 text-blue-600 dark:text-blue-400">{order.CVE_ID}</td>
                <td className="p-4 text-slate-800 dark:text-white">{order.Geo_Country}</td>
                <td className="p-4 text-slate-800 dark:text-white">{order.Threat_Name}</td>
                <td className="p-4 text-slate-800 dark:text-white">{order.Timestamp}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(order.Severity_Level)}`}
                  >
                    {order.Severity_Level}
                  </span>
                </td>
                <td className="p-4 text-slate-800 dark:text-white">{order.Source_IP}</td>
                <td className="p-4 text-slate-800 dark:text-white">{order.Destination_IP}</td>
                <td className="p-4 text-slate-800 dark:text-white">{order.Action_Taken}</td>
                <td className="p-4 text-slate-800 dark:text-white">{order.Protocol}</td>
                <td className="p-4 text-slate-800 dark:text-white">{order.Target_Port}</td>
                <td className="p-4 text-slate-800 dark:text-white">{order.Malware_Family}</td>
                <td className="p-4">
                  <MoreHorizontal className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableSection;

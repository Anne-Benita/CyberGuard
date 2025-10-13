import { MoreHorizontal } from 'lucide-react';
import React from 'react';

const cyberThreatData = [
  {
    CVE_ID: "CVE-2025-0145",
    Geo_Country: "United States",
    Threat_Name: "Phishing Campaign",
    Timestamp: "2025-10-08T00:15:00Z",
    Severity_Level: "Low",
    Source_IP: "192.168.1.10",
    Destination_IP: "10.0.0.5",
    Action_Taken: "Blocked",
    Protocol: "HTTP",
    Target_Port: 80,
    Malware_Family: "None",
  },
  {
    CVE_ID: "CVE-2025-0311",
    Geo_Country: "Germany",
    Threat_Name: "SQL Injection Attempt",
    Timestamp: "2025-10-08T01:20:00Z",
    Severity_Level: "Medium",
    Source_IP: "172.16.0.45",
    Destination_IP: "10.0.0.7",
    Action_Taken: "Mitigated",
    Protocol: "HTTPS",
    Target_Port: 443,
    Malware_Family: "None",
  },
   {
    CVE_ID: "CVE-2025-0448",
    Geo_Country: "Russia",
    Threat_Name: "DDoS Flood Attack",
    Timestamp: "2025-10-08T03:00:00Z",
    Severity_Level: "High",
    Source_IP: "185.10.10.50",
    Destination_IP: "10.0.0.12",
    Action_Taken: "Throttled",
    Protocol: "UDP",
    Target_Port: 8080,
    Malware_Family: "N/A",
  },
  {
    CVE_ID: "CVE-2025-0573",
    Geo_Country: "China",
    Threat_Name: "Ransomware Infection",
    Timestamp: "2025-10-08T05:45:00Z",
    Severity_Level: "Critical",
    Source_IP: "103.45.20.80",
    Destination_IP: "10.0.0.25",
    Action_Taken: "Isolated",
    Protocol: "SMB",
    Target_Port: 445,
    Malware_Family: "LockBit",
  },
  {
    CVE_ID: "CVE-2025-0629",
    Geo_Country: "France",
    Threat_Name: "Unauthorized Access Attempt",
    Timestamp: "2025-10-08T07:30:00Z",
    Severity_Level: "Medium",
    Source_IP: "192.168.20.22",
    Destination_IP: "10.0.0.18",
    Action_Taken: "Denied",
    Protocol: "SSH",
    Target_Port: 22,
    Malware_Family: "None",
  },
  {
    CVE_ID: "CVE-2025-0756",
    Geo_Country: "Brazil",
    Threat_Name: "Trojan Downloader",
    Timestamp: "2025-10-08T09:10:00Z",
    Severity_Level: "High",
    Source_IP: "201.55.33.60",
    Destination_IP: "10.0.0.20",
    Action_Taken: "Quarantined",
    Protocol: "TCP",
    Target_Port: 8081,
    Malware_Family: "Emotet",
  },
  {
    CVE_ID: "CVE-2025-0899",
    Geo_Country: "Japan",
    Threat_Name: "Brute Force Attack",
    Timestamp: "2025-10-08T11:00:00Z",
    Severity_Level: "Low",
    Source_IP: "133.55.22.88",
    Destination_IP: "10.0.0.9",
    Action_Taken: "Alerted",
    Protocol: "SSH",
    Target_Port: 22,
    Malware_Family: "None",
  },
  {
    CVE_ID: "CVE-2025-0950",
    Geo_Country: "India",
    Threat_Name: "Malware Beaconing",
    Timestamp: "2025-10-08T13:30:00Z",
    Severity_Level: "Critical",
    Source_IP: "103.99.12.40",
    Destination_IP: "10.0.0.30",
    Action_Taken: "Contained",
    Protocol: "DNS",
    Target_Port: 53,
    Malware_Family: "RedLine Stealer",
  },
  {
    CVE_ID: "CVE-2025-1082",
    Geo_Country: "South Africa",
    Threat_Name: "Port Scanning",
    Timestamp: "2025-10-08T15:00:00Z",
    Severity_Level: "Low",
    Source_IP: "196.24.88.32",
    Destination_IP: "10.0.0.14",
    Action_Taken: "Logged",
    Protocol: "TCP",
    Target_Port: 443,
    Malware_Family: "None",
  },
  {
    CVE_ID: "CVE-2025-1199",
    Geo_Country: "Canada",
    Threat_Name: "Exploited Zero-Day Vulnerability",
    Timestamp: "2025-10-08T18:00:00Z",
    Severity_Level: "Critical",
    Source_IP: "198.51.100.5",
    Destination_IP: "10.0.0.40",
    Action_Taken: "Patched",
    Protocol: "HTTPS",
    Target_Port: 443,
    Malware_Family: "Unknown",
  },
  // ...rest of your data
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
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
      rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
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
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">CVE_ID</th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">Geo_Country</th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">Threat_Name</th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">Timestamp</th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">Severity_Level</th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">Source_IP</th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">Destination_IP</th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">Action_Taken</th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">Protocol</th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">Target_Port</th>
              <th className="p-3 text-left font-semibold text-slate-700 dark:text-slate-300">Malware_Family</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {cyberThreatData.map((order, index) => (
              <tr
                key={index}
                className="border-b border-slate-200/50 dark:border-slate-700/50 
                hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="p-4 text-blue-600 dark:text-blue-400">{order.CVE_ID}</td>
                <td className="p-4 text-slate-800 dark:text-white">{order.Geo_Country}</td>
                <td className="p-4 text-slate-800 dark:text-white">{order.Threat_Name}</td>
                <td className="p-4 text-slate-800 dark:text-white">{order.Timestamp}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                      order.Severity_Level
                    )}`}
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

import React from "react";
import {
  Zap,
  Lock,
  Eye,
  CloudOff,
  Bug,
  CheckCircle,
  Clock,
} from "lucide-react";

const activities = [
  {
    id: 1,
    type: "Critical Incident",
    icon: "Zap",
    title: "Critical Ransomware Infection Isolated",
    description:
      "Asset 10.0.0.25 infected by LockBit (CVE-2025-0573). The host was automatically isolated to prevent spread.",
    time: "5 minutes ago",
    color: "text-red-600",
    bgcolor: "bg-red-100 dark:bg-red-900/30",
  },
  {
    id: 2,
    type: "Containment Success",
    icon: "Lock",
    title: "Trojan Downloader Quarantined",
    description:
      "High severity Emotet Downloader detected and successfully quarantined on asset 10.0.0.20.",
    time: "45 minutes ago",
    color: "text-green-600",
    bgcolor: "bg-green-100 dark:bg-green-900/30",
  },
  {
    id: 3,
    type: "Reconnaissance",
    icon: "Eye",
    title: "Persistent Brute Force Warning",
    description:
      "Repeated SSH Brute Force attempts logged from source IP 133.55.22.88 (Japan) targeting port 22.",
    time: "2 hours ago",
    color: "text-orange-500",
    bgcolor: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    id: 4,
    type: "System Alert",
    icon: "CloudOff",
    title: "DDoS Flood Attack Throttled",
    description:
      "High volume DDoS Flood Attack from Russia (185.10.10.50) successfully throttled and mitigated.",
    time: "4 hours ago",
    color: "text-indigo-600",
    bgcolor: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    id: 5,
    type: "Malware Activity",
    icon: "Bug",
    title: "Malware Beaconing Detected",
    description:
      "Critical detection of RedLine Stealer beaconing activity over DNS (Port 53) from India.",
    time: "6 hours ago",
    color: "text-red-500",
    bgcolor: "bg-red-100 dark:bg-red-900/30",
  },
  {
    id: 6,
    type: "Operational",
    icon: "CheckCircle",
    title: "Firewall Rule Update Applied",
    description:
      "New policy deployed to block known C2 IPs associated with recent Phishing Campaigns.",
    time: "1 day ago",
    color: "text-blue-500",
    bgcolor: "bg-blue-100 dark:bg-blue-900/30",
  },
];

// helper function to return correct icon
function getIcon(name) {
  switch (name) {
    case "Zap":
      return <Zap className="w-5 h-5" />;
    case "Lock":
      return <Lock className="w-5 h-5" />;
    case "Eye":
      return <Eye className="w-5 h-5" />;
    case "CloudOff":
      return <CloudOff className="w-5 h-5" />;
    case "Bug":
      return <Bug className="w-5 h-5" />;
    case "CheckCircle":
      return <CheckCircle className="w-5 h-5" />;
    default:
      return null;
  }
}

function ActivityFeed() {
  return (
    <div
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
      rounded-2xl border border-slate-200/50 dark:border-slate-700/50 
      max-h-[500px] overflow-y-auto"
    >
      {/* Header Section */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Activity Feed
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Recent System Activities
          </p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>

      {/* Activity List */}
      <div className="p-6 space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`flex items-start space-x-4 p-3 rounded-xl 
              hover:bg-slate-50 dark:hover:bg-slate-800/50 
              transition-colors ${activity.bgcolor}`}
          >
            {/* Icon */}
            <div className={`p-2 rounded-lg ${activity.color}`}>
              {getIcon(activity.icon)}
            </div>

            {/* Text Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
                {activity.title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                {activity.description}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;

import React, { useState, useEffect } from "react";
import cyberLogo from "../assets/cyber.png";
import user1 from "../assets/user1.jpg";
import {
  BarChart3, Scroll, Target, FileText, LayoutDashboard, TrendingUp, Package, Settings,
  Users, BarChart2, ChevronDown, AlertTriangle, Clock3, ShieldAlert, Bug,
  ActivitySquare, CalendarDays
} from "lucide-react";

const allMenuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "charts", icon: BarChart2, label: "Charts", submenu: [
      { id: "pie-chart", icon: BarChart3, label: "Pie Chart", filterKey: "chart" },
      { id: "line-chart", icon: TrendingUp, label: "Line Chart", filterKey: "chart" },
      { id: "cluster-column", icon: Package, label: "Cluster Column Chart", filterKey: "chart" },
    ]
  },
  { id: "threat-type", icon: ShieldAlert, label: "Threat Type", submenu: [
      { id: "malware", icon: Bug, label: "Malware", filterKey: "threatType" },
      { id: "phishing", icon: AlertTriangle, label: "Phishing", filterKey: "threatType" },
      { id: "ransomware", icon: ShieldAlert, label: "Ransomware", filterKey: "threatType" },
      { id: "sql-injection", icon: Package, label: "SQL Injection", filterKey: "threatType" },
    ]
  },
  { id: "severity", icon: AlertTriangle, label: "Severity", submenu: [
      { id: "low", icon: Bug, label: "Low", filterKey: "severity" },
      { id: "medium", icon: ActivitySquare, label: "Medium", filterKey: "severity" },
      { id: "high", icon: ShieldAlert, label: "High", filterKey: "severity" },
      { id: "critical", icon: AlertTriangle, label: "Critical", filterKey: "severity" },
    ]
  },
  { id: "time-range", icon: Clock3, label: "Time Range", submenu: [
      { id: "last-24h", icon: CalendarDays, label: "Last 24 Hours", filterKey: "timeRange" },
      { id: "last-7d", icon: CalendarDays, label: "Last 7 Days", filterKey: "timeRange" },
      { id: "last-30d", icon: CalendarDays, label: "Last 30 Days", filterKey: "timeRange" },
      { id: "custom", icon: Clock3, label: "Custom Range", filterKey: "timeRange" },
    ]
  },
  { id: "vulnerability", icon: TrendingUp, label: "Vulnerability Trend" },
  { id: "incidents", icon: Target, label: "Incident Tracker" },
  { id: "reports", icon: FileText, label: "Reports" },
  { id: "settings", icon: Settings, label: "Settings" },
  { id: "users", icon: Users, label: "User Management", badge: "Admin" },
  { id: "audit", icon: Scroll, label: "Audit Logs", badge: "Admin" },
];

function Sidebar({ collapsed, currentPage, onPageChange, onFilterChange, loggedInUser }) {
  const [expandedItems, setExpandedItems] = useState(new Set());

  // Filter menu by role
  const menuItems = allMenuItems.filter(item => {
    if (["users", "audit"].includes(item.id) && loggedInUser?.role !== "admin") return false;
    return true;
  });

  useEffect(() => {
    menuItems.forEach(item => {
      if (item.submenu?.some(sub => sub.id === currentPage)) {
        setExpandedItems(prev => new Set(prev.add(item.id)));
      }
    });
  }, [currentPage]);

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.has(itemId) ? newSet.delete(itemId) : newSet.add(itemId);
      return newSet;
    });
  };

  const isActive = (id) => id === currentPage;

  return (
    <div className={`${collapsed ? "w-20" : "w-72"} transition-all duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80
      backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10`}>
      
      {/* Logo */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <img src={cyberLogo} alt="Logo" className="w-8 h-8 object-contain"/>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">CyberGuard</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map(item => {
          const hasSubmenu = !!item.submenu;
          const itemActive = isActive(item.id) || item.submenu?.some(sub => isActive(sub.id));

          return (
            <div key={item.id}>
              <button
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  itemActive && !hasSubmenu
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}
                onClick={() => hasSubmenu ? toggleExpanded(item.id) : onPageChange(item.id)}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5"/>
                  {!collapsed && (
                    <>
                      <span className="font-medium ml-2">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">{item.badge}</span>
                      )}
                    </>
                  )}
                </div>
                {!collapsed && hasSubmenu && (
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedItems.has(item.id) ? "rotate-180" : ""}`} />
                )}
              </button>

              {/* Submenu */}
              {!collapsed && hasSubmenu && expandedItems.has(item.id) && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu.map(subitem => (
                    <button
                      key={subitem.id}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center space-x-2 transition-all ${
                        isActive(subitem.id)
                          ? "bg-purple-500 text-white"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                      }`}
                      onClick={() => {
                        if (subitem.filterKey) onFilterChange(subitem.filterKey, subitem.id);
                        else onPageChange(subitem.id);
                      }}
                    >
                      <subitem.icon className="w-4 h-4"/>
                      <span>{subitem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <img src={user1} alt="user" className="w-10 h-10 rounded-full ring-2 ring-blue-500"/>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{loggedInUser?.name || "Guest"}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{loggedInUser?.role || "Passerby"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

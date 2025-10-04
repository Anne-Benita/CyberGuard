import React, { useState } from 'react';
import cyberLogo from '../assets/cyber.png';
import user1 from '../assets/user1.jpg';
import { 
  BarChart3, Scroll, Target, FileText, LayoutDashboard, TrendingUp, Package, Settings, 
  Users, BarChart2, ChevronDown
} from 'lucide-react';

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", active: true },
  { 
    id: "charts", 
    icon: BarChart2, 
    label: "Charts",
    submenu: [
      { id: "pie-chart", icon: BarChart3, label: "Pie Chart" },
      { id: "line-chart", icon: TrendingUp, label: "Line Chart" },
      { id: "cluster-column", icon: Package, label: "Cluster Column Chart" }
    ]
  },
  { id: "vulnerability", icon: TrendingUp, label: "Vulnerability Trend" },
  { id: "incidents", icon: Target, label: "Incident Tracker" },
  { id: "upload", icon: FileText, label: "Upload File" },
  { id: "settings", icon: Settings, label: "Settings" },
  { id: "users", icon: Users, label: "User Management", badge: "Admin" },
  { id: "audit", icon: Scroll, label: "Audit Logs", badge: "Admin" }
];

function Sidebar({ collapsed, onToggle, currentPage, onPageChange }) {
  const [expandedItems, setExpandedItems] = useState(new Set(["analytics"]));

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div 
      className={`${collapsed ? "w-20" : "w-72"} 
      transition duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80
      backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10`}
    >

      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <img src={cyberLogo} alt="Cyber Logo" className="w-8 h-8 object-contain"/> 
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
        {menuItems.map((item) => (
          <div key={item.id}>
            <button 
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all 
              duration-200 ${
                currentPage === item.id || item.active ? `bg-gradient-to-r from-blue-500 
              to-purple-600 text-white shadow-lg shadow-blue-500/25` :
              "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"}`}
              onClick={() =>{
                if (item.submenu)
                toggleExpanded(item.id);

                else{
                    onPageChange(item.id);
                }
                }}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5"/>
                {!collapsed && (
                  <span className="font-medium ml-2">{item.label}</span>
                )}
                {(item.badge || item.count) && (
                  <div className="flex space-x-2">
                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.count && (
                      <span className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {!collapsed && item.submenu && (
                <ChevronDown className="w-4 h-4 transition-transform" />
              )}
            </button>

            {/* Submenus */}
           {!collapsed && item.submenu && expandedItems.has(item.id) && (
            <div className="ml-8 mt-2 space-y-1">
                {item.submenu.map((subitem) => {
                return (
                    <button 
                    key={subitem.id} 
                    className="w-full text-left px-3 py-2 text-sm text-slate-600
                     dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50
                    rounded-lg transition-all"
                    >
                    {subitem.label}
                    </button>
                );
                })}
            </div>
            )}

          </div>
        ))}
      </nav>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <img src={user1} alt="user" className="w-10 h-10 rounded-full ring-2 ring-blue-500"/>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">Anne Benita</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Administrator</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar;

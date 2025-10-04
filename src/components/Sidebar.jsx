import React from 'react';
import cyberLogo from '../assets/cyber.png';
import user1 from '../assets/user1.jpg';
import { 
  BarChart3, Scroll, Target, FileText, LayoutDashboard, TrendingUp, Package, Settings, 
  UserCog, Users, Zap, BarChart2,
  ChevronDown
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

function Sidebar() {
  return (
    <div className="w-72 transition duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80
      backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10">

      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <img 
            src={cyberLogo} 
            alt="Cyber Logo" 
            className="w-8 h-8 object-contain"
          /> 
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">CyberGuard</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Admin Panel</p>
          </div>
        </div>
      </div> 

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button className="w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800">
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5"/>
                <span className="font-medium ml-2">{item.label}</span>
              </div>

              {/* Badges and counts */}
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
               {/* to display dropdown whoose name is chevron */}
              {item.submenu && (
                <ChevronDown className="w-4 h-4 transition-transform" />
              )}
            </button>
             {/* sub menus */}
             <div className="ml-8 mt space-y-1">
              {/*{item.submenu.map((subitem)=>{
                return <button>{subitem.label}</button>
              })}*/}
             </div>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <img
            src={user1}
            alt="user"
            className="w-10 h-10 rounded-full ring-2 ring-blue-500"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 dark:text-white truncate">Anne Benita</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Administrator</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Sidebar;

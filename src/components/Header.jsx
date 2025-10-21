import React, { useState, useEffect } from 'react';
import {
  Menu,
  Search,
  Filter,
  Plus,
  Sun,
  Moon,
  Bell,
  Settings,
  ChevronDown,
} from 'lucide-react';
import user1 from '../assets/user1.jpg';

function Header({ sidebarCollapsed, onToggleSidebar }) {
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // ✅ Handle Dark Mode Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b
     border-slate-200/50 dark:border-slate-700/50 px-6 py-4 relative"
    >
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100
            dark:hover:bg-slate-800 transition-colors"
            onClick={onToggleSidebar}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:block">
            <h1 className="text-2xl font-black text-slate-800 dark:text-white">
              Alert Dashboard
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Aggregated view of security alerts from various sources.
            </p>
          </div>
        </div>

        {/* Center section */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Anything"
              className="w-full pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-slate-400
              hover:text-slate-600 dark:hover:text-slate-300"
            >
              <Filter />
            </button>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3 relative">
          <button
            className="hidden lg:flex items-center space-x-2 py-2 px-4 bg-gradient-to-r from-blue-500
            to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Upload file</span>
          </button>

          {/* Toggle Theme */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300
           hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notification */}
          <button
            className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 
           hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span
              className="absolute -top-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex
            items-center justify-center"
            >
              3
            </span>
          </button>

          {/* Settings */}
          <button
            className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 
           hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div
            className="relative flex items-center space-x-3 pl-3 border-l border-slate-200
           dark:border-slate-700 cursor-pointer"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <img
              src={user1}
              alt="User"
              className="w-8 h-8 rounded-full ring-2 ring-blue-500"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Anne Benita
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Administrator
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />

            {/* Dropdown Menu */}
            {profileOpen && (
              <div
                className="absolute right-0 top-12 w-40 bg-white dark:bg-slate-800 shadow-xl rounded-lg
                 border border-slate-200 dark:border-slate-700 py-2 z-50"
              >
                <button
                  className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  onClick={() => alert('Login clicked')}
                >
                  Login
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  onClick={() => alert('Signup clicked')}
                >
                  Signup
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

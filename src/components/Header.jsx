import React, { useState, useEffect, useRef } from "react";
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
  X,
} from "lucide-react";
import user1 from "../assets/user1.jpg";

function Header({ sidebarCollapsed, onToggleSidebar, onLoginClick, isLoggedIn, onLogout }) {
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
      console.log("Uploaded file:", file);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setUploadedFileName("");
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <>
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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

          {/* Center Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search Anything"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <Filter />
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3 relative">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              onClick={handleUploadClick}
              className="hidden lg:flex items-center space-x-2 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              {uploadedFileName ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium truncate max-w-xs">
                    {uploadedFileName}
                  </span>
                  <X
                    className="w-4 h-4 cursor-pointer hover:text-red-400"
                    onClick={handleRemoveFile}
                  />
                </div>
              ) : (
                <span className="text-sm font-medium">Upload file</span>
              )}
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <button className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            {/* Profile Menu */}
            <div
              className="relative flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700 cursor-pointer"
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

              {profileOpen && (
                <div className="absolute right-0 top-12 w-40 bg-white dark:bg-slate-800 shadow-xl rounded-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
                  {isLoggedIn ? (
                    <button
                      onClick={() => {
                        onLogout();
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onLoginClick();
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Login / Signup
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

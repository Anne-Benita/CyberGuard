import React from 'react'
import cyberLogo from '../assets/cyber.png'
import { Zap } from 'lucide-react'
import user1 from '../assets/user1.jpg';
import { BarChart3, Calendar, CreditCard, FileText, LayoutDashboard, MessageSquare, Package, Settings, 
    ShoppingBag, Users  } from 'lucide-react'


function Sidebar() {
  return (
    <div className="transition duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80
      backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 flex flex-col
      relative z-10">

      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">


            <img 
              src={cyberLogo} 
              alt="Cyber Logo" 
              className="w-8 h-8 object-contain"
            /> 
          {/* Text next to logo */}
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">CyberGuard</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Admin Panel</p>
          </div>
        </div>
      </div> 
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto"></nav>
        {/* User Profile*/}
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <img
         src={user1}
         alt="user"
         className="w-10 h-10 rounded-full ring-2 ring-blue-500"
         />
         <div className="flex-1 min-w-0">
         <div className="flex-1 min-w-0">
         <p className="text-sm font-medium text-slate-800 dark:text-white truncate">Anne Benita</p>
         <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Administrator</p>
         </div>
         </div>
        </div>
        </div>
    </div>
  )
}

export default Sidebar

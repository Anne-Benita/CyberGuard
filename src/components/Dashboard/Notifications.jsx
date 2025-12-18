import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";

function Notifications({ onCountChange }) { // ✅ ADDED prop
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications([
      {
        id: 1,
        title: "High Severity Alert",
        message: "Critical vulnerability detected on server-01",
        time: "2 mins ago",
      },
      {
        id: 2,
        title: "New Report Uploaded",
        message: "SOC_Report_Jan.csv processed",
        time: "1 hour ago",
      },
    ]);
  }, []);

  // ✅ ADDED: notify parent when count changes
  useEffect(() => {
    onCountChange?.(notifications.length);
  }, [notifications, onCountChange]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <Bell className="w-5 h-5" />

        {notifications.length > 0 && (
          <span className="absolute -top-1  w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200">
              Notifications
            </h3>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-4 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              >
                <p className="font-medium text-slate-700 dark:text-slate-200">
                  {n.title}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {n.message}
                </p>
                <span className="text-xs text-slate-400">{n.time}</span>
              </div>
            ))}

            {notifications.length === 0 && (
              <p className="p-4 text-center text-slate-500">
                No notifications
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;

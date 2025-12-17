import React from "react";

function Settings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
        Settings
      </h3>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow space-y-4">
        <h4 className="font-semibold text-slate-700 dark:text-slate-200">
          API Integrations
        </h4>

        <input
          type="text"
          placeholder="VirusTotal API Key"
          className="w-full p-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white outline-none"
        />

        <input
          type="text"
          placeholder="Shodan API Key"
          className="w-full p-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white outline-none"
        />
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow space-y-4">
        <h4 className="font-semibold text-slate-700 dark:text-slate-200">
          Preferences
        </h4>

        <label className="flex items-center gap-3">
          <input type="checkbox" />
          <span className="text-slate-600 dark:text-slate-300">
            Enable real-time alerts
          </span>
        </label>
      </div>
    </div>
  );
}

export default Settings;

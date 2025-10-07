import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function HourlyThreatChart() {
  // Hourly data
  const data = [
    { hour: "00:00", total: 100, critical: 5 },
    { hour: "01:00", total: 95, critical: 3 },
    { hour: "02:00", total: 98, critical: 4 },
    { hour: "03:00", total: 80, critical: 2 },
    { hour: "04:00", total: 75, critical: 1 },
    { hour: "05:00", total: 110, critical: 6 },
    { hour: "06:00", total: 180, critical: 15 },
    { hour: "07:00", total: 250, critical: 25 },
    { hour: "08:00", total: 450, critical: 85 },
    { hour: "09:00", total: 380, critical: 55 },
    { hour: "10:00", total: 310, critical: 40 },
    { hour: "11:00", total: 250, critical: 30 },
    { hour: "12:00", total: 220, critical: 20 },
    { hour: "13:00", total: 205, critical: 18 },
    { hour: "14:00", total: 215, critical: 15 },
    { hour: "15:00", total: 240, critical: 22 },
    { hour: "16:00", total: 290, critical: 35 },
    { hour: "17:00", total: 320, critical: 45 },
    { hour: "18:00", total: 280, critical: 30 },
    { hour: "19:00", total: 210, critical: 18 },
    { hour: "20:00", total: 170, critical: 12 },
    { hour: "21:00", total: 145, critical: 9 },
    { hour: "22:00", total: 120, critical: 7 },
    { hour: "23:00", total: 105, critical: 5 },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border
      border-slate-200/50 dark:border-slate-700/50 p-6 h-[550px]">
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Hourly Threat Activity
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Volume vs Critical/High Intensity Events
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
          <XAxis dataKey="hour" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value, name) => [`${value}`, name === "total" ? "Total Volume" : "Critical"] }
          />
          {/* Lines */}
          <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HourlyThreatChart;

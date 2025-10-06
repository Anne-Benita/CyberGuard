import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

function RevenueChart() {
  const data = [
    { month: "Jan", vulnerabilities: 120, incidents: 80 },
    { month: "Feb", vulnerabilities: 140, incidents: 95 },
    { month: "Mar", vulnerabilities: 110, incidents: 70 },
    { month: "Apr", vulnerabilities: 160, incidents: 100 },
    { month: "May", vulnerabilities: 180, incidents: 120 },
    { month: "Jun", vulnerabilities: 150, incidents: 90 },
    { month: "Jul", vulnerabilities: 175, incidents: 110 },
    { month: "Aug", vulnerabilities: 160, incidents: 95 },
    { month: "Sep", vulnerabilities: 155, incidents: 85 },
    { month: "Oct", vulnerabilities: 165, incidents: 100 },
    { month: "Nov", vulnerabilities: 170, incidents: 105 },
    { month: "Dec", vulnerabilities: 180, incidents: 115 },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border
    border-slate-200/50 dark:border-slate-700/50 p-6">
      
      {/* Title + legend container */}
      <div className="flex items-center justify-between mb-6 w-full">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Vulnerabilities Chart
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monthly Vulnerabilities and Incidents
          </p>
        </div>

        {/* Legend now inside same flex container */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Vulnerabilities
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Incidents
            </span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value, name) => [`${value}`, name]}
            />

            {/* Bars */}
            <Bar
              dataKey="vulnerabilities"
              fill="url(#vulnerabilitiesGradient)"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="incidents"
              fill="url(#incidentsGradient)"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />

            {/* Gradients BELOW bars (structure preserved) */}
            <defs>
              <linearGradient id="vulnerabilitiesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="incidentsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;

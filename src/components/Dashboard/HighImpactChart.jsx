import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  
} from "recharts";

function HighImpactChart() {
  // Example data for threat types
  const data = [
    { type: "SQL Injection", count: 120 },
    { type: "Cross-Site Scripting (XSS)", count: 95 },
    { type: "Phishing Attacks", count: 140 },
    { type: "Malware Distribution", count: 110 },
    { type: "Denial of Service (DoS)", count: 80 },
    { type: "Privilege Escalation", count: 70 },
    { type: "Brute Force Attacks", count: 90 },
    { type: "Man-in-the-Middle (MITM)", count: 60 },
    { type: "Data Exfiltration", count: 105 },
    { type: "Zero-Day Exploits", count: 85 },
  ];

  // Colors matching the pie chart
  const colors = ["#6366f1", "#8b5cf6", "#94a3b8", "#64748b"];

  return (
    <div
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border
      border-slate-200/50 dark:border-slate-700/50 p-6 h-[600px]"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            High-Impact Threat Types
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            X-Axis: Count | Y-Axis: Threat Type
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          barCategoryGap="20%" // adds spacing between bars for better readability
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
          <XAxis
            type="number"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          
          />
          <YAxis
            type="category"
            dataKey="type"
            stroke="#64748b"
            fontSize={12}
            width={160}
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
            formatter={(value) => [`${value}`, "Count"]}
          />
          
          <Bar
            dataKey="count"
            radius={[4, 4, 4, 4]}
            barSize={25} // increases bar thickness for visual fullness
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HighImpactChart;

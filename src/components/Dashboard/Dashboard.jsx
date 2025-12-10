import React from 'react'
import StatsGrid from './StatsGrid';
import ChartSection from './ChartSection';
import TableSection from './TableSection';
import ActivityFeed from './ActivityFeed';
import Map from './Map';
function Dashboard() {
  return (
    <div className="space-y-6">
      
      <StatsGrid />
      <ChartSection />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TableSection />
        </div>

        <div>
          <ActivityFeed />
        </div>
      </div>

      {/* FULL-WIDTH MAP */}
      <div className="w-full">
        <Map />
      </div>

    </div>
  );
}

export default Dashboard;


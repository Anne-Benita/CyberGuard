import React from 'react'
import VulnerabilitiesChart from './VulnerabilitiesChart';
import VulTypeChart from './VulTypeChart';
function ChartSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
        <VulnerabilitiesChart/>
        </div >
        <div className="space-y-6">
        <VulTypeChart/>
        </div>
    </div>
    
  )
}

export default ChartSection;

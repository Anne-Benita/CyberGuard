import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Dashboard/Login";
import Reports from "./components/Dashboard/Reports";
import IncidentTracker from "./components/Dashboard/IncidentTracker";
import Settings from "./components/Dashboard/Settings";
import Auditlogs from "./components/Dashboard/Auditlogs";
import Usermanagement from "./components/Dashboard/Usermanagement";
import Vulnerabilitytrend from "./components/Dashboard/Vulnerabilitytrend";


// Placeholder components for chart pages
function PieChartPage() { return <div>Pie Chart Page</div>; }
function LineChartPage() { return <div>Line Chart Page</div>; }
function ClusterColumnPage() { return <div>Cluster Column Chart Page</div>; }

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  // Filters state
  const [filters, setFilters] = useState({
    threatType: null,
    severity: null,
    timeRange: null
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleLoginClick = () => setCurrentPage("login");
  const handleCloseLogin = () => setCurrentPage("dashboard");

  // Function to render content inside dashboard area
  const renderDashboardContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard filters={filters} currentPage={currentPage} />;
      case "pie-chart":
        return <PieChartPage />;
      case "line-chart":
        return <LineChartPage />;
      case "cluster-column":
        return <ClusterColumnPage />;
      case "incidents":
        return <IncidentTracker />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      case "audit":
        return <Auditlogs />;

      case "users":
        return <Usermanagement />;

      case "vulnerability":
        return <Vulnerabilitytrend />;
      

      default:
        return <Dashboard filters={filters} currentPage={currentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      {currentPage === "login" ? (
        // Fullscreen login page outside dashboard
        <Login onClose={handleCloseLogin} />
      ) : (
        // Dashboard layout
        <div className="flex h-screen overflow-hidden">
          <Sidebar
            collapsed={sidebarCollapsed}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onFilterChange={handleFilterChange}
          />

          <div className="flex-1 flex flex-col overflow-hidden relative">
            <Header
              sidebarCollapsed={sidebarCollapsed}
              onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
              onLoginClick={handleLoginClick}
            />

            <main className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 p-6">
              {renderDashboardContent()}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

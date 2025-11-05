import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Dashboard/Login";

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

  // Update dashboard filters
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Open login page
  const handleLoginClick = () => setCurrentPage("login");
  // Close login page and return to dashboard
  const handleCloseLogin = () => setCurrentPage("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onFilterChange={handleFilterChange} // ✅ filters callback
        />

        <div className="flex-1 flex flex-col overflow-hidden relative">

          {/* Header */}
          <Header
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            onLoginClick={handleLoginClick}
          />

          <main className="flex-1 overflow-y-auto bg-transparent relative">
            <div className="p-6 space-y-6">

              {/* Dashboard + filters always displayed on dashboard page */}
              {(currentPage === "dashboard" || 
                ["pie-chart","line-chart","cluster-column"].includes(currentPage)) && (
                <Dashboard filters={filters} currentPage={currentPage} />
              )}

              {/* Chart Pages */}
              {currentPage === "pie-chart" && <PieChartPage />}
              {currentPage === "line-chart" && <LineChartPage />}
              {currentPage === "cluster-column" && <ClusterColumnPage />}
              

              {/* Other pages */}
              {currentPage === "upload" && <div>Reports Page</div>}
              {currentPage === "users" && <div>User Management Page</div>}
              {currentPage === "incidents" && <div>Incident Tracker Page</div>}
              {currentPage === "settings" && <div>Settings Page</div>}

            </div>

            {/* Login modal */}
            {currentPage === "login" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <Login onClose={handleCloseLogin} />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

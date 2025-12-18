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

function PieChartPage() { return <div>Pie Chart Page</div>; }
function LineChartPage() { return <div>Line Chart Page</div>; }
function ClusterColumnPage() { return <div>Cluster Column Chart Page</div>; }

const initialUsers = [
  { name: "Admin", email: "admin@gmail.com", role: "admin", password: "admin123" },
  { name: "John Doe", email: "user@gmail.com", role: "user", password: "user123" },
];

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [users, setUsers] = useState(initialUsers);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [uploadedFile, setUploadedFile] = useState(null); // ✅ ADDED

  const [filters, setFilters] = useState({
    threatType: null,
    severity: null,
    timeRange: null,
  });

  const handleFilterChange = (key, value) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const handleLogin = ({ email, password }) => {
    if (email === "admin@gmail.com") {
      if (password !== "admin123") return alert("Wrong admin password!");
      setLoggedInUser({ name: "Admin", email, role: "admin" });
      setCurrentPage("dashboard");
      return;
    }

    if (!email.endsWith("@gmail.com"))
      return alert("Users must log in with a Gmail account!");

    const user = users.find(u => u.email === email && u.password === password);
    if (!user)
      return alert("User not found or wrong credentials. Please sign up first.");

    setLoggedInUser(user);
    setCurrentPage("dashboard");
  };

  const handleSignup = ({ name, email, password }) => {
    if (!email.endsWith("@gmail.com"))
      return alert("Users must sign up with a Gmail account!");
    if (users.find(u => u.email === email))
      return alert("User already exists.");

    const newUser = { name, email, password, role: "user" };
    setUsers(prev => [...prev, newUser]);
    alert("Signup successful! Please log in.");
    setCurrentPage("login");
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentPage("dashboard");
  };

  const renderDashboardContent = () => {
    const adminOnly = ["audit", "users"];

    if (!loggedInUser &&
      !["dashboard", "pie-chart", "line-chart", "cluster-column"].includes(currentPage)) {
      return <div className="text-center text-red-500 font-semibold">
        Please log in to access this page.
      </div>;
    }

    if (adminOnly.includes(currentPage) && loggedInUser?.role !== "admin") {
      return <div className="text-center text-red-500 font-semibold">
        Unauthorized: Admin only page.
      </div>;
    }

    switch (currentPage) {
      case "dashboard": return <Dashboard filters={filters} currentPage={currentPage} />;
      case "pie-chart": return <PieChartPage />;
      case "line-chart": return <LineChartPage />;
      case "cluster-column": return <ClusterColumnPage />;
      case "incidents": return <IncidentTracker />;
      case "reports": return <Reports uploadedFile={uploadedFile} />; // ✅ ADDED
      case "settings": return <Settings />;
      case "audit": return <Auditlogs />;
      case "users": return <Usermanagement />;
      case "vulnerability": return <Vulnerabilitytrend />;
      default: return <Dashboard filters={filters} currentPage={currentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      {currentPage === "login" ? (
        <Login onClose={() => setCurrentPage("dashboard")}
               onLogin={handleLogin}
               onSignup={handleSignup} />
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar
            collapsed={sidebarCollapsed}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onFilterChange={handleFilterChange}
            loggedInUser={loggedInUser}
          />

          <div className="flex-1 flex flex-col overflow-hidden relative">
            <Header
              sidebarCollapsed={sidebarCollapsed}
              onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
              isLoggedIn={!!loggedInUser}
              onLoginClick={() => setCurrentPage("login")}
              onLogout={handleLogout}
              onFileUpload={setUploadedFile} // ✅ ADDED
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

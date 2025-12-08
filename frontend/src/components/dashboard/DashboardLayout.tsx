import { useState, type ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardNavbar } from "./DashboardNavbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={sidebarOpen ? "sidebar-open" : ""}>

      <div 
        className="sidebar-overlay"
        onClick={() => setSidebarOpen(false)}
      />

      <div className="sidebar-wrapper">
        <DashboardSidebar />
      </div>

      <div className="dashboard-navbar fixed top-0 left-60 right-0 z-50 bg-wild-light-grey px-6">
        <DashboardNavbar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      <main className="dashboard-main mt-10 ml-60 pt-16 p-10 min-h-screen">
        {children}
      </main>
    </div>
  );
}




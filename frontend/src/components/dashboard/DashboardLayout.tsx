import type { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardNavbar } from "./DashboardNavbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <div className="fixed top-0 left-0 h-screen w-60">
        <DashboardSidebar />
      </div>

      <div className="fixed top-0 left-60 right-0 z-50 bg-wild-light-grey px-6">
        <DashboardNavbar />
      </div>

      <main className="mt-10 ml-60 pt-16 p-10 bg-white min-h-screen">
        {children}
      </main>
    </div>
  );
}




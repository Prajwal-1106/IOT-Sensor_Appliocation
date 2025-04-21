
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-industrial-lightGray flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} />
        <main 
          className={cn(
            "flex-1 overflow-x-hidden overflow-y-auto p-4 transition-all duration-300",
            sidebarCollapsed ? "ml-16" : "ml-64"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

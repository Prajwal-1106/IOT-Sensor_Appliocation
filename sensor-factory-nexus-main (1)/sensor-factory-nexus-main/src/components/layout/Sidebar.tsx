
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  WrenchIcon, 
  Cpu
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Inventory', icon: <Package size={20} />, path: '/inventory' },
    { name: 'Orders', icon: <ShoppingCart size={20} />, path: '/orders' },
    { name: 'Sales', icon: <BarChart3 size={20} />, path: '/sales' },
    { name: 'Clients', icon: <Users size={20} />, path: '/clients' },
    { name: 'Sensors', icon: <Cpu size={20} />, path: '/sensors' },
    { name: 'Maintenance', icon: <WrenchIcon size={20} />, path: '/maintenance' },
  ];

  return (
    <aside 
      className={cn(
        "bg-white border-r border-gray-200 h-full transition-all duration-300 fixed top-16 left-0 z-10",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="py-4">
        <nav className="mt-5 px-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-all",
                location.pathname === item.path 
                  ? "bg-industrial-blue text-white" 
                  : "text-gray-600 hover:bg-industrial-lightGray hover:text-industrial-blue",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <div className="mr-3">{item.icon}</div>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

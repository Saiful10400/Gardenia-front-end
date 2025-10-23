import AdminAside from '@/components/Component/Dashboard/Admin-dashboard/Asidenav/AdminAside';
import DashboardNav from '@/components/Component/Dashboard/Shared/DashboardNav/DashboardNav';
import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-20 w-full bg-white min-h-[80px] shadow-md flex items-center">
        <DashboardNav />
      </nav>

      {/* Main Section */}
      <section className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-[250px] w-full hidden lg:flex flex-col bg-white shadow-lg sticky top-[80px] h-[calc(100vh-80px)] ">
          {/* Scrollable Menu */}
          <div className="overflow-y-auto p-4 pb-20 flex-1">
            <AdminAside />
          </div>

          {/* Home Button at bottom left */}
          <div className="absolute bottom-4 left-4">
            <Link href="/">
              <button className="flex items-center justify-center w-12 h-12 bg-[#147d3b] text-white rounded-full shadow-lg hover:bg-[#0f622d] transition-all duration-200">
                <Home size={24} />
              </button>
            </Link>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 lg:px-8 px-4 py-6 min-h-screen">
          {children}
        </main>
      </section>
    </div>
  );
};

export default Layout;

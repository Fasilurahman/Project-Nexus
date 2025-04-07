import React from 'react';
import { BarChart2, Users, } from 'lucide-react';
import Sidebar from '../components/Design/Sidebar';
import Header from '../components/Design/Header';
import { StatCard } from '../components/Design/StatCard';
import { Charts } from '../components/Design/Charts';


function Dashboard() {
 
  return (
    <div className="flex min-h-screen bg-[#111827]">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value="50.8K" trend="+12.3%" icon={Users} />
          <StatCard title="Total Revenue" value="$24.5K" trend="+8.7%" icon={BarChart2} />
          <StatCard title="Active Users" value="750" trend="+2.1%" icon={Users} />
          <StatCard title="Conversion Rate" value="2.3K" trend="-0.5%" icon={BarChart2} />
        </div>

        <Charts />
      </div>
    </div>
  );
}

export default Dashboard;
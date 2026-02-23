import { useState } from 'react';
import Sidebar from '../components/shared/Sidebar';
import DashboardTopHeader from '../components/shared/DashboardTopHeader';
import StatusCard from '../components/shared/StatusCard';
import ComplianceCalendar from '../components/shared/ComplianceCalendar';
import QuickLinks from '../components/shared/QuickLinks';
import NotificationAlerts from '../components/shared/NotificationAlerts';
import RecentSubmission from '../components/shared/RecentSubmission';
import NeedHelp from '../components/shared/NeedHelp';

const Dashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Fixed Header */}
      <DashboardTopHeader 
        companyName="ABC Textile Mills Pvt Ltd"
        tubeNumber="TuBe T365-MH-2025-0001234"
        lastLogin="20 Dec 2025, 10:30 AM"
        onMenuClick={() => setIsMobileSidebarOpen(true)}
      />

      {/* Sidebar - Slide-in on mobile, Fixed on desktop */}
      <Sidebar 
        activeItem="Dashboard"
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content - with margin for fixed sidebar and header */}
      <div className="pt-[136px] lg:ml-64 transition-all duration-300">
        {/* Dashboard Content */}
        <main className="p-4 sm:p-6">
          {/* Top Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <StatusCard
              title="Registration Status"
              status="approved"
              statusText="Approved"
              date="Approved on: 10 Jan 2025"
              actionText="View Certificate"
              actionLink="#"
              bgColor="bg-green-50"
              iconBgColor="bg-green-500"
              icon={
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              }
            />
            <StatusCard
              title="ASR-Annual Returns"
              status="submitted"
              statusText="Submitted (FY 2024-25)"
              date="Approved on: 10 Jan 2025"
              actionText="View ASR Details"
              actionLink="#"
              bgColor="bg-green-50"
              iconBgColor="bg-green-500"
              icon={
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              }
            />
            <StatusCard
              title="MSR-Monthly Returns"
              status="overdue"
              statusText="Overdue (Dec 2025)"
              date="Overdue by 8 days"
              actionText="File Now"
              actionLink="#"
              bgColor="bg-red-50"
              iconBgColor="bg-red-500"
              icon={
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              }
            />
          </div>

          {/* Main Content: Two Column Layout - Responsive */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Left Column: Calendar and Recent Submissions */}
            <div className="w-full lg:w-[60%] space-y-4 sm:space-y-6">
              <ComplianceCalendar />
              <RecentSubmission />
            </div>
            
            {/* Right Column: Quick Links, Notifications, Need Help */}
            <div className="w-full lg:w-[40%] space-y-4 sm:space-y-6">
              <QuickLinks />
              <NotificationAlerts />
              <NeedHelp />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState } from 'react';
import TopHeader from './TopHeader';

const DashboardTopHeader = ({ companyName, tubeNumber, lastLogin, onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      type: 'error',
      title: 'MSR Overdue',
      message: 'November 2024 MSR is pending',
      time: '2 hours ago',
      icon: (
        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      type: 'info',
      title: 'System Announcement',
      message: 'New MSR format from Jan 2025',
      time: '1 day ago',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      type: 'success',
      title: 'System Approved',
      message: 'Oct 2024 MSR approved',
      time: '2 days ago',
      icon: (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      {/* Top Bar - Government of India */}
      <TopHeader />

      {/* Main Header */}
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left: Mobile Menu Button + Company Info */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
            {/* Mobile Menu Button */}
            <button 
              onClick={onMenuClick}
              className="lg:hidden p-1.5 sm:p-2 hover:bg-neutral-100 rounded-lg flex-shrink-0"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="bg-orange-500 text-white w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg flex-shrink-0">
              ABC
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xs sm:text-sm lg:text-lg font-semibold text-neutral-900 truncate">{companyName}</h1>
              <p className="text-[10px] sm:text-xs lg:text-sm text-neutral-600 truncate">{tubeNumber}</p>
            </div>
          </div>

          {/* Right: User Actions */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 flex-shrink-0">
            <span className="text-xs sm:text-sm text-neutral-600 hidden lg:inline whitespace-nowrap">Last Login: {lastLogin}</span>
            
            {/* User Icon */}
            <button className="p-1.5 sm:p-2 hover:bg-neutral-100 rounded-lg hidden sm:block">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            
            {/* Notification Icon with Badge */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 sm:p-2 hover:bg-neutral-100 rounded-lg relative"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {/* Notification Badge */}
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notification Panel */}
              {showNotifications && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowNotifications(false)}
                  ></div>
                  
                  {/* Panel */}
                  <div className="fixed sm:absolute left-2 right-2 sm:left-auto sm:right-0 mt-2 sm:w-96 bg-white rounded-lg shadow-xl border z-50 max-h-[80vh] sm:max-h-[500px] overflow-y-auto">
                    <div className="p-3 sm:p-4 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm sm:text-base font-semibold text-neutral-900">Notifications</h3>
                        <span className="text-[10px] sm:text-xs bg-red-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                          {notifications.length} new
                        </span>
                      </div>
                    </div>
                    
                    <div className="divide-y">
                      {notifications.map((notification, index) => (
                        <div key={index} className="p-3 sm:p-4 hover:bg-neutral-50 transition-colors cursor-pointer">
                          <div className="flex gap-2 sm:gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="w-4 h-4 sm:w-5 sm:h-5">
                                {notification.icon}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs sm:text-sm font-semibold text-neutral-900">{notification.title}</h4>
                              <p className="text-xs sm:text-sm text-neutral-600 mt-1 break-words">{notification.message}</p>
                              <p className="text-[10px] sm:text-xs text-neutral-500 mt-1 sm:mt-2">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-2 sm:p-3 border-t text-center">
                      <a href="#" className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View All Notifications
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button className="p-1.5 sm:p-2 hover:bg-neutral-100 rounded-lg hidden md:block">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm whitespace-nowrap">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopHeader;

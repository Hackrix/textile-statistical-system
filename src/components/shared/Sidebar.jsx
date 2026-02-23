import { useState } from 'react';

const Sidebar = ({ activeItem = 'Dashboard', isMobileOpen, setIsMobileOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { name: 'ASR', icon: 'document', path: '/asr' },
    { name: 'MSR Submit', icon: 'upload', path: '/msr-submit' },
    { name: 'Reports', icon: 'chart', path: '/reports' },
    { name: 'Communication Notifications', icon: 'bell', path: '/notifications' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`bg-[#1e293b] text-white fixed left-0 top-[136px] bottom-0 flex flex-col transition-all duration-300 overflow-y-auto z-50 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Menu Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <span className={`font-semibold ${isCollapsed ? 'hidden' : 'block'}`}>Menu</span>
        <div className="flex items-center gap-2">
          {/* Close button for mobile */}
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-white/70 hover:text-white focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Collapse button for desktop */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block text-white/70 hover:text-white focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 transition-colors ${
              activeItem === item.name
                ? 'bg-blue-600 text-white border-l-4 border-blue-400'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            {/* Icon */}
            <div className="w-5 h-5 flex-shrink-0">
              {item.icon === 'dashboard' && (
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
              )}
              {item.icon === 'document' && (
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                </svg>
              )}
              {item.icon === 'upload' && (
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
                </svg>
              )}
              {item.icon === 'chart' && (
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              )}
              {item.icon === 'bell' && (
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
                </svg>
              )}
            </div>
            {!isCollapsed && <span className="text-sm">{item.name}</span>}
          </a>
        ))}
      </nav>
    </aside>
    </>
  );
};

export default Sidebar;

const NotificationAlerts = () => {
  const notifications = [
    {
      type: 'error',
      title: 'MSR Overdue',
      message: 'November 2024 MSR is pending',
      time: '2 hours ago',
      bgColor: 'bg-red-50',
      borderColor: 'border-l-red-500'
    },
    {
      type: 'info',
      title: 'System Announcement',
      message: 'New MSR format from Jan 2025',
      time: '1 day ago',
      bgColor: 'bg-blue-50',
      borderColor: 'border-l-blue-500'
    },
    {
      type: 'success',
      title: 'System Approved',
      message: 'Oct 2024 MSR approved',
      time: '2 days ago',
      bgColor: 'bg-green-50',
      borderColor: 'border-l-green-500'
    }
  ];

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-base font-semibold text-neutral-900 mb-4">Notification & Alerts</h3>
      
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`${notification.bgColor} ${notification.borderColor} border-l-4 p-4 rounded`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-neutral-900">{notification.title}</h4>
                <p className="text-sm text-neutral-600 mt-1">{notification.message}</p>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-2">{notification.time}</p>
          </div>
        ))}
      </div>

      <a href="#" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 mt-4">
        View All Notifications
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
};

export default NotificationAlerts;

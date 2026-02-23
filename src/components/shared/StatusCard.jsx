const StatusCard = ({ title, status, statusText, date, actionText, actionLink, bgColor, icon, iconBgColor }) => {
  // Add minimal shadow and colored border based on status
  const borderClass = status === 'approved' ? 'border-green-300' : 
                      status === 'submitted' ? 'border-green-300' : 
                      status === 'overdue' ? 'border-red-300' : 'border-neutral-200';
  
  const shadowClass = status === 'approved' ? 'shadow-sm' : 
                      status === 'submitted' ? 'shadow-sm' : 
                      status === 'overdue' ? 'shadow-sm' : 'shadow-sm';
  
  return (
    <div className={`${bgColor} ${shadowClass} ${borderClass} rounded-lg border-2 p-6 relative`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-neutral-900 mb-2">{title}</h3>
          <div className="flex items-center gap-2 mb-1">
            {icon}
            <span className="text-sm font-medium text-neutral-700">{statusText}</span>
          </div>
          <p className="text-xs text-neutral-600">{date}</p>
        </div>
        {/* Circular icon badge */}
        <div className={`${iconBgColor} w-12 h-12 rounded-full flex items-center justify-center absolute top-6 right-6`}>
          {status === 'approved' && (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {status === 'submitted' && (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
          {status === 'overdue' && (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
        </div>
      </div>
      {actionText && (
        <a href={actionLink} className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 mt-4">
          {actionText}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </div>
  );
};

export default StatusCard;

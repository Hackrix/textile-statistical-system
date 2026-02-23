const ComplianceCalendar = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // December 2025 calendar data
  const calendarDays = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, null, null, null, null]
  ];

  // Special dates
  const msrDueDate = 10;
  const todayDate = 18;

  return (
    <div className="bg-white rounded-lg border p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-neutral-900">Compliance Calendar</h3>
        <p className="text-xs text-neutral-600 mt-1">December 2025</p>
      </div>

      {/* Calendar Grid */}
      <div className="mt-4">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-neutral-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        {calendarDays.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((day, dayIndex) => {
              if (!day) {
                return <div key={dayIndex} className="aspect-square" />;
              }

              const isMsrDue = day === msrDueDate;
              const isToday = day === todayDate;

              return (
                <div
                  key={dayIndex}
                  className={`aspect-square flex flex-col items-center justify-center text-sm rounded border relative ${
                    isMsrDue
                      ? 'bg-red-100 border-red-300 text-neutral-900'
                      : isToday
                      ? 'bg-blue-500 text-white font-semibold border-blue-600'
                      : 'bg-white text-neutral-700 hover:bg-neutral-50 border-neutral-200'
                  }`}
                >
                  <span className={isMsrDue || isToday ? 'font-semibold' : ''}>{day}</span>
                  {isMsrDue && (
                    <span className="text-[9px] text-red-700 font-semibold mt-0.5">MSR Due</span>
                  )}
                  {isToday && (
                    <span className="text-[9px] text-white font-semibold mt-0.5">Today</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceCalendar;

import { useState } from 'react';

const RecentSubmission = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  
  const allSubmissions = [
    {
      type: 'MSR',
      period: 'Oct 2024',
      submittedOn: '08 Nov 2024',
      status: 'Approved',
      action: 'View'
    },
    {
      type: 'MSR',
      period: 'Sep 2024',
      submittedOn: '09 Oct 2024',
      status: 'Approved',
      action: 'View'
    },
    {
      type: 'ASR',
      period: 'FY 2024-25',
      submittedOn: '15 May 2024',
      status: 'Approved',
      action: 'View'
    },
    {
      type: 'MSR',
      period: 'Aug 2024',
      submittedOn: '08 Sep 2024',
      status: 'Approved',
      action: 'View'
    },
    {
      type: 'MSR',
      period: 'Jul 2024',
      submittedOn: '09 Aug 2024',
      status: 'Approved',
      action: 'View'
    },
    {
      type: 'MSR',
      period: 'Jun 2024',
      submittedOn: '08 Jul 2024',
      status: 'Approved',
      action: 'View'
    }
  ];

  const totalPages = Math.ceil(allSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubmissions = allSubmissions.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-base font-semibold text-neutral-900 mb-4">Recent Submission</h3>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left text-sm font-medium text-neutral-600 pb-3">Type</th>
              <th className="text-left text-sm font-medium text-neutral-600 pb-3">Period</th>
              <th className="text-left text-sm font-medium text-neutral-600 pb-3">Submitted On</th>
              <th className="text-left text-sm font-medium text-neutral-600 pb-3">Status</th>
              <th className="text-left text-sm font-medium text-neutral-600 pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentSubmissions.map((submission, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-3 text-sm text-neutral-900 font-medium">{submission.type}</td>
                <td className="py-3 text-sm text-neutral-700">{submission.period}</td>
                <td className="py-3 text-sm text-neutral-700">{submission.submittedOn}</td>
                <td className="py-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {submission.status}
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    {submission.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <div className="text-sm text-neutral-600">
          Showing {startIndex + 1} to {Math.min(endIndex, allSubmissions.length)} of {allSubmissions.length} entries
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded border ${
              currentPage === 1
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : 'bg-white text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => goToPage(index + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded border ${
              currentPage === totalPages
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : 'bg-white text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentSubmission;

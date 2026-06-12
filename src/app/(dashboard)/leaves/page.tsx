'use client';

import React from 'react';

export default function LeaveRequestsDashboard() {
  return (
    <div className="w-full min-h-screen bg-gray-50/50 p-6 sm:p-10 font-sans">
      {/* Breadcrumb & Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leave Requests</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
          <span>Dashboard</span>
          <span>&gt;</span>
          <span className="text-gray-400">Leave Requests</span>
        </div>
      </div>

      {/* Navigation Tabs (Hardcoded Active State on 'All') */}
      <div className="flex border-b border-gray-200 mb-6 gap-2">
        {['All', 'Pending', 'Approved', 'Rejected'].map((tab, idx) => (
          <button
            key={tab}
            className={`px-5 py-2.5 text-sm font-medium relative top-[1px] ${
              idx === 0
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Card Container */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Filters Panel */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search employee..."
              className="w-full pl-3 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Leave Type Dropdown */}
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:border-blue-500 cursor-pointer text-gray-700">
              <option>All Leave Types</option>
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Annual Leave</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Leave Type</th>
                <th className="px-6 py-4">From</th>
                <th className="px-6 py-4">To</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right pr-10">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              
              {/* Row 1: Pending Sick Leave */}
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-semibold">
                      J
                    </div>
                    John Doe
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">Sick Leave</td>
                <td className="px-6 py-4 text-gray-500">22 May 2024</td>
                <td className="px-6 py-4 text-gray-500">23 May 2024</td>
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">Fever and rest</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium tracking-wide bg-amber-50 text-amber-600 border border-amber-200">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100/80 rounded-md transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </button>
                    <button className="p-1.5 text-rose-600 bg-rose-50 hover:bg-rose-100/80 rounded-md transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2: Pending Casual Leave */}
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-semibold">
                      E
                    </div>
                    Emily Davis
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">Casual Leave</td>
                <td className="px-6 py-4 text-gray-500">24 May 2024</td>
                <td className="px-6 py-4 text-gray-500">24 May 2024</td>
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">Personal work</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium tracking-wide bg-amber-50 text-amber-600 border border-amber-200">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-emerald-600 bg-emerald-50 hover:bg-emerald-100/80 rounded-md transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </button>
                    <button className="p-1.5 text-rose-600 bg-rose-50 hover:bg-rose-100/80 rounded-md transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3: Approved Annual Leave */}
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-semibold">
                      M
                    </div>
                    Michael Johnson
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">Annual Leave</td>
                <td className="px-6 py-4 text-gray-500">27 May 2024</td>
                <td className="px-6 py-4 text-gray-500">31 May 2024</td>
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">Vacation</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium tracking-wide bg-emerald-50 text-emerald-600 border border-emerald-200">
                    Approved
                  </span>
                </td>
                <td className="px-6 py-4 text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <span className="p-1.5 text-emerald-600 bg-emerald-50 rounded-md opacity-60">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.5 2.5a.75.75 0 001.14-.082l4-5.6z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <button className="p-1.5 text-rose-600 bg-rose-50 hover:bg-rose-100/80 rounded-md transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 4: Rejected Casual Leave */}
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-semibold">
                      J
                    </div>
                    Jane Smith
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">Casual Leave</td>
                <td className="px-6 py-4 text-gray-500">20 May 2024</td>
                <td className="px-6 py-4 text-gray-500">20 May 2024</td>
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">Family function</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium tracking-wide bg-rose-50 text-rose-600 border border-rose-200">
                    Rejected
                  </span>
                </td>
                <td className="px-6 py-4 text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-xs text-gray-400 italic pr-2 select-none">
                      No actions available
                    </span>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
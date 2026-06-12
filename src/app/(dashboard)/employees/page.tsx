"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, Plus, Edit2, Trash2, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from "next/navigation";


// Sample Data matching your UI
const INITIAL_EMPLOYEES = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', department: 'Engineering', role: 'Developer', status: 'Active', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', department: 'Design', role: 'UI/UX Designer', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60' },
  { id: 3, name: 'Michael Johnson', email: 'michael.j@example.com', department: 'Marketing', role: 'Marketing Manager', status: 'Active', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60' },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', department: 'HR', role: 'HR Manager', status: 'Active', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=60' },
  { id: 5, name: 'William Brown', email: 'william.brown@example.com', department: 'Engineering', role: 'Senior Developer', status: 'Inactive', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60' },
];

export default function EmployeesPage() {
  const router = useRouter(); // ✅ REQUIRED
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDept = selectedDept === 'All Departments' || emp.department === selectedDept;
    const matchesStatus = selectedStatus === 'All Status' || emp.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#334155] font-sans antialiased">
      
      {/* Top Header Bar */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Employees</h1>
          <div className="flex items-center gap-2 text-sm text-slate-400 mt-1">
            <span>Dashboard</span>
            <span>&gt;</span>
            <span className="text-slate-600 font-medium">Employees</span>
          </div>
        </div>

        {/* Admin Profile Segment */}
        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60" 
              alt="Admin Profile" 
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 leading-tight">Admin</p>
              <p className="text-xs text-slate-400">Super Admin</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 cursor-pointer hidden sm:block" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-8 max-w-[1600px] mx-auto">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          
          {/* Controls Bar (Search, Filters, Add Button) */}
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3 flex-1 max-w-3xl">
              {/* Search Input */}
              <div className="relative flex-1 min-w-[260px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, email or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Department Dropdown */}
              <div className="relative">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 cursor-pointer focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option>All Departments</option>
                  <option>Engineering</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>HR</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Status Dropdown */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 cursor-pointer focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Add Employee Button */}
            <button onClick={() => router.push("/employees/add")}
  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl"
>
              <span>Add Employee</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider bg-slate-50/50">
                  <th className="py-4 px-6">Employee</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Department</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm font-medium text-slate-700">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-slate-50/40 transition-colors group">
                    {/* Name & Avatar */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img 
                        src={employee.avatar} 
                        alt={employee.name} 
                        className="w-10 h-10 rounded-full object-cover border border-slate-100"
                      />
                      <span className="font-semibold text-slate-800">{employee.name}</span>
                    </td>
                    
                    {/* Email */}
                    <td className="py-4 px-6 text-slate-500 font-normal">{employee.email}</td>
                    
                    {/* Department */}
                    <td className="py-4 px-6 text-slate-600">{employee.department}</td>
                    
                    {/* Role */}
                    <td className="py-4 px-6 text-slate-500 font-normal">{employee.role}</td>
                    
                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                        employee.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-rose-50 text-rose-600'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    
                    {/* Action Buttons */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredEmployees.length === 0 && (
                  <tr>
                    <td className="text-center py-12 text-slate-400 font-normal">
                      No employees found matching the filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm font-medium text-slate-500">
            <div>
              Showing <span className="text-slate-800">1</span> to <span className="text-slate-800">{filteredEmployees.length}</span> of <span className="text-slate-800">45</span> employees
            </div>
            
            <div className="flex items-center gap-1.5 self-center sm:self-auto">
              <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button onClick={() => setCurrentPage(1)} className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${currentPage === 1 ? 'bg-[#2563eb] text-white' : 'hover:bg-slate-50 text-slate-700'}`}>1</button>
              <button onClick={() => setCurrentPage(2)} className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${currentPage === 2 ? 'bg-[#2563eb] text-white' : 'hover:bg-slate-50 text-slate-700'}`}>2</button>
              <button onClick={() => setCurrentPage(3)} className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${currentPage === 3 ? 'bg-[#2563eb] text-white' : 'hover:bg-slate-50 text-slate-700'}`}>3</button>
              <span className="px-1 text-slate-400">...</span>
              <button onClick={() => setCurrentPage(9)} className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${currentPage === 9 ? 'bg-[#2563eb] text-white' : 'hover:bg-slate-50 text-slate-700'}`}>9</button>
              
              <button className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

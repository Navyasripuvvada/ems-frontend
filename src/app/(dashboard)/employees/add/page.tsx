'use client';

import React, { useState } from 'react';

export default function AddEmployeeForm() {
  // Initialize state with the mock data from the image
  const [formData, setFormData] = useState({
    fullName: 'Sarah Wilson',
    department: 'Engineering',
    email: 'sarah.wilson@example.com',
    role: 'Developer',
    phone: '+1 987 654 3210',
    designation: 'Software Engineer',
    joiningDate: '2024-05-22', // YYYY-MM-DD format required for native HTML date input
    employmentType: 'Full Time',
  });

  // Track input updates dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit action
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Employee Data Payload:', formData);
    alert(`Employee "${formData.fullName}" added successfully!\nCheck the developer console for the payload.`);
  };

  // Reset form handler
  const handleCancel = () => {
    if (confirm('Are you sure you want to clear your current inputs?')) {
      setFormData({
        fullName: '',
        department: 'Engineering',
        email: '',
        role: 'Developer',
        phone: '',
        designation: 'Software Engineer',
        joiningDate: '',
        employmentType: 'Full Time',
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 bg-slate-50 min-h-screen">
      {/* Header & Breadcrumbs navigation layout */}
      <header className="mb-6">
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 mb-1">
          <span className="hover:text-gray-700 cursor-pointer">Dashboard</span>
          <span>&gt;</span>
          <span className="hover:text-gray-700 cursor-pointer">Employees</span>
          <span>&gt;</span>
          <span className="text-gray-400">Add Employee</span>
        </div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center">
          <span className="mr-2 text-gray-600 cursor-pointer md:hidden">&#9776;</span>
          Add Employee
        </h1>
      </header>

      {/* Main Grid container linking up both modules */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Card: Input Fields Grid */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-slate-800 mb-6">Employee Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Department Selection */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Department</label>
              <div className="relative">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Role Custom Options */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Role</label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                >
                  <option value="Developer">Developer</option>
                  <option value="Manager">Manager</option>
                  <option value="Lead">Lead</option>
                  <option value="Intern">Intern</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Designation Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Designation</label>
              <div className="relative">
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                >
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="QA Engineer">QA Engineer</option>
                  <option value="Product Manager">Product Manager</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Date of Joining */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Date of Joining</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Employment Type</label>
              <div className="relative">
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Core Operations Buttons */}
          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Add Employee
            </button>
          </div>
        </div>

        {/* Right Card: Account Setup Layout Block */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
          <div className="max-w-[240px]">
            <h2 className="text-md font-bold text-slate-800 mb-2 text-left lg:text-center">Account Setup</h2>
            <p className="text-xs text-gray-400 mb-8 text-left lg:text-center leading-relaxed">
              An email will be sent to the employee with password reset link.
            </p>
          </div>

          {/* Pure CSS graphic reflecting image structure */}
          <div className="relative w-28 h-24 mb-4">
            <div className="absolute bottom-0 w-full h-16 bg-blue-50 rounded-lg border-2 border-blue-100"></div>
            
            {/* Pop out mail wrapper animation asset */}
            <div className="absolute bottom-4 left-4 right-4 h-14 bg-white rounded-md shadow-md border border-blue-50 flex items-center justify-center animate-bounce">
              <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Envelope overlapping dynamic styling clips */}
            <div 
              className="absolute bottom-0 w-full h-10 bg-blue-100/50" 
              style={{ clipPath: 'polygon(0% 100%, 50% 40%, 100% 100%)' }}
            ></div>
            
            {/* Floating verification badge */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white border-2 border-white shadow-sm">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "sonner";

/* =========================================================
   📌 ENUM OPTIONS (MUST MATCH BACKEND EXACTLY)
========================================================= */

const DEPARTMENTS = [
  'development',
  'testing',
  'ui_ux',
  'web3',
  'product_manager',
];

const DESIGNATIONS = [
  'designer',
  'frontend_developer',
  'backend_developer',
  'full_stack_developer',
  'manual_tester',
  'automation_tester',
  'product_manager',
  'blockchain_developer',
  'devops',
];

const EMPLOYMENT_TYPES = [
  'full_time',
  'part_time',
  'contract',
  'internship',
];

const ROLES = ['employee', 'admin'];
const STATUS = ['active', 'inactive', 'terminated'];

/* ========================================================= */


  export default function AddEmployeeForm() {
  const API_URL = 'http://localhost:5000/admin/add-employee';

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfJoining: '',
    employmentType: 'full_time',
    department: 'development',
    designation: 'full_stack_developer',
    role: 'employee',
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');

    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    /* ✅ EMAIL VALIDATION */
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      setLoading(false);
      return;
    }

    /* ✅ NAME VALIDATION (final safety check) */
    if (!/^[a-zA-Z\s]{1,50}$/.test(formData.fullName)) {
      toast.error("Name must contain only letters and max 50 characters");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        dateOfJoining: formData.dateOfJoining,
        employmentType: formData.employmentType,
        department: formData.department,
        designation: formData.designation,
        role: formData.role,
      };

      const res = await axios.post(API_URL, payload, getAuthHeader());

      console.log('✅ Employee Created:', res.data);

      toast.success('Employee added successfully & email sent!');

      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        dateOfJoining: '',
        employmentType: 'full_time',
        department: '',
        designation: 'full_stack_developer',
        role: 'employee',
      });

    } catch (error: any) {
      console.error('❌ API Error:', error);

      toast.error(
        error?.response?.data?.message ||
        'Failed to add employee. Please check backend.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-xl font-semibold mb-6">Add Employee</h1>

      <div className="grid grid-cols-3 gap-6">

        {/* LEFT FORM */}
        <form
          onSubmit={handleSubmit}
          className="col-span-2 bg-white p-6 rounded-lg shadow space-y-4"
        >
          <h2 className="font-semibold text-gray-700">
            Employee Information
          </h2>

          <div className="grid grid-cols-2 gap-4">

            {/* FULL NAME */}
            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');

                if (value.length <= 50) {
                  setFormData(prev => ({ ...prev, fullName: value }));
                }
              }}
              className="border p-2 rounded"
              required
            />

            {/* DEPARTMENT */}
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="" disabled>Select Department</option>
              {DEPARTMENTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* EMAIL */}
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            {/* ROLE */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="" disabled>Select Role</option>
              {ROLES.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            {/* PHONE */}
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) {
                  setFormData(prev => ({ ...prev, phoneNumber: value }));
                }
              }}
              className="border p-2 rounded"
              required
            />

            {/* DESIGNATION */}
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="" disabled>Select Designation</option>
              {DESIGNATIONS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* JOINING DATE */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                Enter Joining Date
              </label>

              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </div>

            {/* EMPLOYMENT TYPE */}
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="" disabled>Select Employment Type</option>
              {EMPLOYMENT_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" className="px-4 py-2 border rounded">
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? 'Adding...' : 'Add Employee'}
            </button>
          </div>

        </form>

        {/* RIGHT PANEL */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-center items-center text-center">
          <h2 className="font-semibold mb-2">Account Setup</h2>
          <p className="text-sm text-gray-500 mb-4">
            An email will be sent to the employee with password setup instructions.
          </p>
          <div className="text-green-500 text-4xl">✔</div>
        </div>

      </div>
    </div>
  );
}
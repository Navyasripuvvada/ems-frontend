'use client';

import React, { useState, useEffect } from 'react';
import AttendanceCalendar from '../../components/AttendanceCalendar';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState< null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('No authentication token found. Please login again.');
        }

        const response = await fetch(
          'https://ems-backend-lac.vercel.app/employee/dashboard',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized (401). Invalid or expired token.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err: any) {
        console.error('Dashboard fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-lg font-semibold text-slate-500 animate-pulse">
          Loading system metrics...
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl bg-rose-50 p-6 text-rose-600 shadow-sm border border-rose-100 max-w-md">
          <p className="font-bold">Dashboard Connection Failed</p>
          <p className="text-sm mt-1 text-rose-500">
            {error || 'No data payload received.'}
          </p>
        </div>
      </div>
    );
  }

  const { totalLeaves, leavesTaken, remainingLeaves, pendingRequests } = dashboardData;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const leavePercentage = totalLeaves > 0 ? remainingLeaves / totalLeaves : 0;
  const strokeDashoffset = circumference - leavePercentage * circumference;

  return (
  <div className="min-h-screen bg-slate-50/60 p-4 md:p-8 font-sans text-slate-800">

    {/* Metrics Row */}
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

      <div className="rounded-2xl bg-blue-50 border border-blue-100 p-8 shadow-sm">
        <p className="text-xs text-blue-500">Total Leaves</p>
        <h3 className="text-2xl font-bold text-blue-700">{totalLeaves}</h3>
      </div>

      <div className="rounded-2xl bg-rose-50 border border-emerald-100 p-5 shadow-sm">
        <p className="text-xs text-rose-500">Leaves Taken</p>
        <h3 className="text-2xl font-bold text-rose-700">{leavesTaken}</h3>
      </div>

      <div className="rounded-2xl bg-amber-50 border border-amber-100 p-5 shadow-sm ">
        <p className="text-xs text-amber-500">Remaining</p>
        <h3 className="text-2xl font-bold text-amber-700">{remainingLeaves}</h3>
      </div>

      <div className="rounded-2xl bg-emerald-50 border border-rose-100 p-5 shadow-sm ">
        <p className="text-xs text-emerald-500">Pending Requests</p>
        <h3 className="text-2xl font-bold text-emerlad-700">{pendingRequests}</h3>
      </div>

    </div>

    {/* Two Column Layout */}
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

      {/* Leave Balance Panel */}
<div className="relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border flex flex-col">

  {/* soft background glow */}
  <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-60" />

  {/* Header */}
  <div className="relative">
    <h2 className="font-bold text-slate-800">Leave Balance</h2>
    <p className="text-xs text-slate-400 mt-1">
      Your remaining annual leave allocation
    </p>
  </div>

  {/* Status Badge */}
  <div className="relative mt-3">
    <span className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
      Healthy Balance
    </span>
  </div>

  {/* Circle Section */}
  <div className="relative flex flex-col items-center justify-center gap-3 mt-6">

    <div className="relative flex items-center justify-center">
      <svg className="h-40 w-40 transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#e2e8f0"
          strokeWidth="12"
          fill="transparent"
        />

        {/* Progress Circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#6366f1"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* Center Content */}
      <div className="absolute text-center">
        <div className="text-3xl font-bold text-slate-800">
          {remainingLeaves}
        </div>
        <div className="text-xs text-slate-500">Days Left</div>
      </div>
    </div>

    {/* Progress Insight */}
    <p className="text-sm text-slate-600 text-center">
      You’ve used <span className="font-semibold">4</span> of 15 days
    </p>
  </div>

  {/* Divider */}
  <div className="my-4 border-t" />

  {/* Stats Row */}
  <div className="flex items-center justify-between text-xs text-slate-500">
    <span>Used: 4 days</span>
    <span>Total: 15 days</span>
  </div>

  {/* Footer Tip */}
  <div className="mt-4 text-xs text-slate-400">
    Tip: Plan early to avoid leave rejection during peak season.
  </div>
</div>

      {/* Attendance Calendar Panel */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <AttendanceCalendar />
      </div>

    </div>
  </div>
);
}
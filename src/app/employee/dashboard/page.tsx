'use client';

import React, { useState, useEffect } from 'react';
import { DashboardData } from '@/types/dashboard';

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
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
          'http://localhost:5000/employee/dashboard',
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

        const data: DashboardData = await response.json();
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

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const leavePercentage = totalLeaves > 0 ? remainingLeaves / totalLeaves : 0;
  const strokeDashoffset = circumference - leavePercentage * circumference;

  return (
    <div className="min-h-screen bg-slate-50/60 p-4 md:p-8 font-sans text-slate-800">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Welcome back, John! 👋
          </h1>
          <p className="text-sm text-slate-500">
            Here&apos;s what&apos;s happening today.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm border">
          <p className="text-xs text-slate-400">Total Leaves</p>
          <h3 className="text-2xl font-bold">{totalLeaves}</h3>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border">
          <p className="text-xs text-slate-400">Leaves Taken</p>
          <h3 className="text-2xl font-bold">{leavesTaken}</h3>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border">
          <p className="text-xs text-slate-400">Remaining</p>
          <h3 className="text-2xl font-bold">{remainingLeaves}</h3>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border">
          <p className="text-xs text-slate-400">Pending Requests</p>
          <h3 className="text-2xl font-bold">{pendingRequests}</h3>
        </div>
      </div>

      {/* Two Column Layout for Interactive Panels */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Leave Balance Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col justify-between">
          <div>
            <h2 className="font-bold mb-6 text-slate-800">Leave Balance</h2>
            <div className="flex flex-col items-center justify-around gap-6 sm:flex-row my-4">
              <div className="relative flex items-center justify-center">
                <svg className="h-36 w-36 transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    stroke="#e2e8f0"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    stroke="#6366f1"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute text-center">
                  <div className="text-2xl font-bold">{remainingLeaves}</div>
                  <div className="text-xs text-slate-500">Days Left</div>
                </div>
              </div>

              <div className="space-y-3 w-full sm:w-auto min-w-[160px]">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-500"></span> Casual Leave
                  </div>
                  <span className="font-semibold text-slate-700">7 Days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-400"></span> Sick Leave
                  </div>
                  <span className="font-semibold text-slate-700">5 Days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-teal-400"></span> Earned Leave
                  </div>
                  <span className="font-semibold text-slate-700">2 Days</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mt-4 border-t border-slate-50 pt-4 text-right">
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              View Leave Details
            </button>
          </div> */}
        </div>

        {/* My Attendance Calendar Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col justify-between">
          <div>
            <h2 className="font-bold mb-4 text-slate-800">My Attendance (May 2024)</h2>
            
            {/* Days of week header */}
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400 mb-2">
              <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
            </div>

            {/* Calendar dates mapping */}
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-700 gap-y-3 items-center">
              {/* Row 1 */}
              <div></div>
              <div className="p-1">2</div>
              <div className="p-1">3</div>
              <div className="p-1">4</div>
              <div className="p-1">5</div>
              <div className="p-1">6</div>
              <div className="p-1">7</div>

              {/* Row 2 */}
              <div className="p-1">8</div>
              <div className="relative flex flex-col items-center justify-center p-1">
                <span className="text-emerald-600 font-bold">9</span>
                <span className="h-1 w-1 rounded-full bg-emerald-500 mt-0.5"></span>
              </div>
              <div className="relative flex flex-col items-center justify-center p-1">
                <span className="text-emerald-600 font-bold">10</span>
                <span className="h-1 w-1 rounded-full bg-emerald-500 mt-0.5"></span>
              </div>
              <div className="p-1">11</div>
              <div className="p-1">12</div>
              <div className="p-1">13</div>
              <div className="text-indigo-600 font-bold p-1">14</div>

              {/* Row 3 */}
              <div className="text-emerald-600 font-bold p-1">15</div>
              <div className="text-rose-500 font-bold p-1">16</div>
              <div className="p-1">17</div>
              <div className="p-1">18</div>
              <div className="text-rose-500 font-bold p-1">19</div>
              <div className="p-1">20</div>
              <div className="text-amber-500 font-bold p-1">21</div>

              {/* Row 4 */}
              <div className="p-1">22</div>
              <div className="text-rose-500 font-bold p-1">23</div>
              <div className="text-emerald-600 font-bold p-1">24</div>
              <div className="p-1">25</div>
              <div className="text-rose-500 font-bold p-1">26</div>
              <div className="text-indigo-500 font-bold p-1">27</div>
              <div className="text-amber-500 font-bold p-1">28</div>
            </div>

            {/* Attendance Legends */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-slate-500 border-t border-slate-50 pt-4 mt-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Present
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400"></span> Half Day
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span> Leave
              </div>
            </div>
          </div>

          {/* <div className="text-right mt-4 pt-2">
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
              View Attendance
            </button>
          </div> */}
        </div>

      </div>
    </div>
  );
}
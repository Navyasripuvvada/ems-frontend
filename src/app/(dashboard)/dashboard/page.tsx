"use client";
import { useEffect, useState } from "react";

/* ---------------- Types ---------------- */
type CardProps = {
  title: string;
  value: string;
  sub: string;
};

type ActivityProps = {
  name: string;
  action: string;
  time: string;
};

/* ---------------- Page ---------------- */
export default function DashboardPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    function getTimeUntilMidnight() {
      const now = new Date();

      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      return midnight.getTime() - now.getTime();
    }

    function scheduleMidnightUpdate() {
      const msUntilMidnight = getTimeUntilMidnight();

      const timeout = setTimeout(() => {
        setCurrentDate(new Date());
        scheduleMidnightUpdate();
      }, msUntilMidnight);

      return timeout;
    }

    const timeout = scheduleMidnightUpdate();
    return () => clearTimeout(timeout);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#f4f6fb] p-6">

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, Admin 👋
          </h1>
          <p className="text-gray-500 text-sm">
            Here’s what’s happening with your team today
          </p>
        </div>

        <button className="bg-white shadow px-4 py-2 rounded text-sm text-gray-600">
          {formattedDate}
        </button>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card title="Total Employees" value="45" sub="+5 this month" />
        <Card title="Pending Leaves" value="8" sub="2 today" />
        <Card title="Approved Leaves" value="12" sub="+3 this month" />
        <Card title="Completed Tasks" value="64" sub="12 this week" />
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Donut Chart */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold text-gray-700 mb-4">
            Leave Overview
          </h2>

          <div className="flex items-center justify-center h-48">
            <div className="w-36 h-36 rounded-full border-[14px] border-blue-500 border-t-green-400 border-r-red-400 border-b-gray-300" />
          </div>

          <div className="text-sm space-y-2 mt-4 text-gray-600">
            <p>🔵 Pending: 8</p>
            <p>🟢 Approved: 12</p>
            <p>🔴 Rejected: 3</p>
            <p>⚪ Cancelled: 2</p>
          </div>
        </div>

        {/* Activity Panel */}
        <div className="bg-white p-5 rounded-xl shadow md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-700">
              Recent Activities
            </h2>

            <button className="text-blue-500 text-sm">
              View all
            </button>
          </div>

          <div className="space-y-4">
            <Activity name="John Doe" action="requested leave" time="2 mins ago" />
            <Activity name="Jane Smith" action="completed task 'UI Design'" time="15 mins ago" />
            <Activity name="Michael Johnson" action="added new task" time="1 hour ago" />
            <Activity name="Emily Davis" action="requested leave" time="2 hours ago" />
          </div>
        </div>

      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Card({ title, value, sub }: CardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      <p className="text-green-500 text-xs mt-1">{sub}</p>
    </div>
  );
}

function Activity({ name, action, time }: ActivityProps) {
  return (
    <div className="flex justify-between items-start border-b pb-3">
      <div>
        <p className="text-sm text-gray-800">
          <span className="font-semibold">{name}</span> {action}
        </p>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}
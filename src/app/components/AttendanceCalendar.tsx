"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";

export default function AttendanceCalendar() {
  const [attendance, setAttendance] = useState<any[]>([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

 useEffect(() => {
  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("TOKEN =>", token);

      const res = await api.get(
        `/attendance/monthly?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Attendance Response:", res.data);

      setAttendance(res.data.calendar || []);
    } catch (error) {
      console.error("Attendance fetch error:", error);
    }
  };

  fetchAttendance();
}, [month, year]);

  const attendanceMap = useMemo(() => {
    const map: Record<number, string> = {};

    attendance.forEach((item) => {
      map[item.day] = item.status.toLowerCase();
    });

    return map;
  }, [attendance]);

  const daysInMonth = new Date(year, month, 0).getDate();

  const firstDay =
    (new Date(year, month - 1, 1).getDay() + 6) % 7;

  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h2 className="font-bold text-2xl mb-6">
        My Attendance (
        {today.toLocaleString("default", {
          month: "long",
        })}{" "}
        {year})
      </h2>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center font-semibold text-gray-500 mb-5">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-y-5 text-center">
        {days.map((day, index) => {
          if (!day) return <div key={index}></div>;

          const status = attendanceMap[day];

          const isToday =
            day === today.getDate() &&
            month === today.getMonth() + 1 &&
            year === today.getFullYear();

          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-1 rounded-md ${
                isToday
                  ? "bg-indigo-100 border border-indigo-400"
                  : ""
              }`}
            >
              {/* Present */}
              {status === "present" ? (
                <>
                  <span className="text-green-600 font-bold">
                    {day}
                  </span>
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-1"></span>
                </>
              ) : status === "leave" ? (
                <>
                  {/* Leave */}
                  <span className="text-red-500 font-bold">
                    {day}
                  </span>
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-1"></span>
                </>
              ) : (
                <>
                  {/* Default */}
                  <span className="text-gray-700">
                    {day}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-8 pt-4 border-t">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span>Present</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span>Leave</span>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";

type AttendanceType = {
  date: string;
  status: "present" | "leave" | "absent";
};

export default function AttendanceCalendar() {
  const [attendance, setAttendance] = useState<AttendanceType[]>([]);
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1; // ✅ IMPORTANT (1-based for API)

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get(
          `/attendance/monthly?month=${month}&year=${year}`
        );

        console.log("API DATA 👉", res.data); // ✅ Debug

        // ⚠️ Adjust this line if backend wraps data
        setAttendance(res.data);
        // OR: setAttendance(res.data.data);

      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    fetchAttendance();
  }, [month, year]);

  // ✅ Convert to map
  const attendanceMap = useMemo(() => {
    const map: Record<string, string> = {};
    attendance.forEach((a) => {
      map[a.date] = a.status;
    });
    return map;
  }, [attendance]);

  const daysInMonth = new Date(year, month, 0).getDate();

  const firstDay = (new Date(year, month - 1, 1).getDay() + 6) % 7;

  const formatDate = (d: number) =>
    `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const getStyle = (status?: string, isWeekend?: boolean) => {
    if (status === "present") return "text-emerald-600 font-bold";
    if (status === "leave") return "text-indigo-500 font-bold";
    if (status === "absent") return "text-rose-500 font-bold";
    if (isWeekend) return "text-slate-400";
    return "text-slate-700";
  };

  return (
    <>
      <h2 className="font-bold mb-4 text-slate-800">
        My Attendance ({today.toLocaleString("default", { month: "long" })}{" "}
        {year})
      </h2>

      {/* Days */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400 mb-2">
        <div>Mon</div><div>Tue</div><div>Wed</div>
        <div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold gap-y-3 items-center">
        {days.map((day, idx) => {
          if (!day) return <div key={idx}></div>;

          const fullDate = formatDate(day);
          const status = attendanceMap[fullDate];

          const dateObj = new Date(year, month - 1, day);
          const isWeekend =
            dateObj.getDay() === 0 || dateObj.getDay() === 6;

          const isToday =
            day === today.getDate() &&
            month === today.getMonth() + 1 &&
            year === today.getFullYear();

          return (
            <div
              key={idx}
              className={`relative flex flex-col items-center justify-center p-1 rounded-md
                ${getStyle(status, isWeekend)}
                ${isToday ? "bg-indigo-100 border border-indigo-400" : ""}
              `}
            >
              <span>{day}</span>

              {status === "present" && (
                <span className="h-1 w-1 bg-emerald-500 rounded-full mt-0.5"></span>
              )}
              {status === "leave" && (
                <span className="h-1 w-1 bg-indigo-500 rounded-full mt-0.5"></span>
              )}
              {status === "absent" && (
                <span className="h-1 w-1 bg-rose-500 rounded-full mt-0.5"></span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-slate-500 border-t border-slate-50 pt-4 mt-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Present
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-indigo-500"></span> Leave
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500"></span> Absent
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-400"></span> Weekend
        </div>
      </div>
    </>
  );
}
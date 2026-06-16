"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  UserCircle2,
  Mail,
  Phone,
  Building2,
  Briefcase,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";

/* ---------------- TYPE ---------------- */
type Employee = {
  fullName: string;
  email: string;
  phoneNumber: string;
  department: string;
  designation: string;
  dateOfJoining: string;
  reportingManager: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  employeeId?: string;
};

export default function EmployeeProfile() {
  const [data, setData] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/employee/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data) throw new Error("Empty response from server");

      setData(res.data.employee);
      setError(null);
    } catch (err: any) {
      console.error("Profile fetch error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load profile"
      );

      setData(null);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return <p className="p-6">Loading profile...</p>;
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  /* ---------------- EMPTY STATE ---------------- */
  if (!data) {
    return <p className="p-6 text-red-500">No profile data found</p>;
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* LEFT CARD */}
      <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center text-center">
        <UserCircle2 size={90} className="text-gray-400" />

        <h2 className="mt-4 text-xl font-bold">{data.fullName}</h2>
        <p className="text-gray-500">{data.designation}</p>

        <span className="mt-3 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
          {data.employeeId || "EMP"}
        </span>
      </div>

      {/* RIGHT DETAILS */}
      <div className="col-span-2 bg-white shadow rounded-xl p-6 text-left border border-gray-100 flex flex-col space-y-4">
  {/* Row 1: Full Name */}
        <ProfileRow icon={<UserCircle2 size={18} />} label="Full Name" value={data.fullName} />
        <ProfileRow icon={<Mail size={18} />} label="Email" value={data.email} />
        <ProfileRow icon={<Phone size={18} />} label="Phone" value={data.phoneNumber} />
        <ProfileRow icon={<Building2 size={18} />} label="Department" value={data.department} />
        <ProfileRow icon={<Briefcase size={18} />} label="Designation" value={data.designation} />
        <ProfileRow icon={<CalendarDays size={18} />} label="Date of Joining" value={data.dateOfJoining} />
        <ProfileRow icon={<MapPin size={18} />} label="Address" value={data.address} />
        <ProfileRow icon={<CalendarDays size={18} />} label="Date of Birth" value={data.dateOfBirth} />
        <ProfileRow icon={<Users size={18} />} label="Gender" value={data.gender} />
      </div>
    </div>
  );
}

/* ---------------- ROW COMPONENT ---------------- */
function ProfileRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="flex items-center gap-2 text-gray-600">
        {icon}
        <span>{label}</span>
      </div>
      <div className="font-medium text-gray-800">{value}</div>
    </div>
  );
}
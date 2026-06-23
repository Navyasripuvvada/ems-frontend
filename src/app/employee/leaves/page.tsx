"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function ApplyLeave() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);

  const [totalLeaves, setTotalLeaves] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(true);

  const [errors, setErrors] = useState<any>({});

  const today = new Date().toISOString().split("T")[0];

  /* ================= FETCH LEAVE BALANCE ================= */
  useEffect(() => {
    const fetchLeaveBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          "https://ems-backend-lac.vercel.app/leave/leave-balance",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTotalLeaves(response.data.totalLeaves ?? 0);
      } catch (error: any) {
        toast.error("Failed to load leave balance");
      } finally {
        setBalanceLoading(false);
      }
    };

    fetchLeaveBalance();
  }, []);

  /* ================= CALCULATE DAYS ================= */
  useEffect(() => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);

      const diff =
        Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;

      setNumberOfDays(diff > 0 ? diff : 0);
    } else {
      setNumberOfDays(0);
    }
  }, [fromDate, toDate]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: any = {};

    if (!subject.trim()) newErrors.subject = true;
    if (!fromDate) newErrors.fromDate = true;
    if (!toDate) newErrors.toDate = true;
    if (!reason.trim()) newErrors.reason = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields");
      return;
    }

    if (fromDate < today || toDate < today) {
      toast.error("Past dates are not allowed");
      return;
    }

    if (toDate < fromDate) {
      toast.error("End date cannot be before start date");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "https://ems-backend-lac.vercel.app/leave/apply",
        { fromDate, toDate, reason, subject },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Leave applied successfully!");

      setSubject("");
      setFromDate("");
      setToDate("");
      setReason("");
      setNumberOfDays(0);
      setErrors({});
    } catch (error: any) {
      toast.error(error.response?.data?.message?.[0] || "Failed to apply leave");
    } finally {
      setLoading(false);
    }
    if (numberOfDays > 5) {
  toast.error("Leave cannot be greater than 5 days");
  return;
}
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center -mt-10">
      <div className="w-full max-w-[1100px] h-[500px] flex gap-4">

        {/* MAIN CONTAINER */}
      

          {/* LEFT CARD */}
          <div className="flex-1 bg-white rounded-xl shadow-md p-5 flex flex-col justify-between">

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Request Time Off
              </h2>
              <div className="border-b mt-2 mb-4"></div>

              <form onSubmit={handleSubmit} className="space-y-3">

                {/* SUBJECT */}
                <div>
                  <label className="text-xs text-gray-500">Subject</label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`w-full mt-1 border p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500
                      ${errors.subject ? "border-red-500" : "border-gray-300"}
                    `}
                    placeholder="Enter leave subject"
                  />
                </div>

                {/* DATE ROW */}
                <div className="flex gap-3">
                  <div className="w-1/2">
                    <label className="text-xs text-gray-500">Start Date</label>
                    <input
                      type="date"
                      value={fromDate}
                      min={today}
                      onChange={(e) => setFromDate(e.target.value)}
                      className={`w-full mt-1 border p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500
                        ${errors.fromDate ? "border-red-500" : "border-gray-300"}
                      `}
                    />
                  </div>

                  <div className="w-1/2">
                    <label className="text-xs text-gray-500">End Date</label>
                    <input
                      type="date"
                      value={toDate}
                      min={fromDate || today}
                      disabled={!fromDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className={`w-full mt-1 border p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500
                        ${!fromDate ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"}
                        ${errors.toDate ? "border-red-500" : ""}
                      `}
                    />
                  </div>
                </div>

                {/* DAYS */}
                <div>
                  <label className="text-xs text-gray-500">Number of Days</label>
                  <input
                    readOnly
                    value={numberOfDays}
                    className="w-full mt-1 bg-gray-100 border border-gray-200 p-2 rounded-md text-sm"
                  />
                </div>

                {/* REASON */}
                <div>
                  <label className="text-xs text-gray-500">
                    Reason for Leave
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => {
                      const val = e.target.value;

                      if (/^[a-zA-Z\s]*$/.test(val) && val.length <= 150) {
                        setReason(val);
                      }
                    }}
                    rows={3}
                    placeholder="Only alphabets allowed (max 150 chars)"
                    className={`w-full mt-1 border p-2 rounded-md text-sm resize-none focus:ring-2 focus:ring-blue-500
                      ${errors.reason ? "border-red-500" : "border-gray-300"}
                    `}
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    {reason.length}/150 characters
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 pt-2 -mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setSubject("");
                      setFromDate("");
                      setToDate("");
                      setReason("");
                      setNumberOfDays(0);
                      setErrors({});
                    }}
                    className="px-4 py-1.5 text-sm rounded-full border border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-1.5 text-sm rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="w-[280px] bg-white rounded-xl shadow-md p-4 flex flex-col justify-center items-center">

            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Leave Dashboard
            </h3>

            <div className="w-[140px] h-[140px] rounded-full border-[10px] border-green-200 flex items-center justify-center relative">
              <div className="absolute w-[140px] h-[140px] rounded-full border-[10px] border-green-600 border-t-transparent rotate-45"></div>

              <div className="text-center">
                <p className="text-lg font-semibold">
                  {balanceLoading ? "--" : `${totalLeaves} / 20`}
                </p>
                <p className="text-[10px] text-gray-500">Days</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Your Available Leave:{" "}
              <span className="font-medium text-gray-700">
                {balanceLoading ? "--" : totalLeaves} Days
              </span>
            </p>
          </div>

        </div>
      </div>
    
  );
}
import api from "@/lib/faceapi";

export const useAttendance = () => {
  const markAttendance = async () => {
    try {
      const res = await api.post("/attendance/mark"); // backend will create later
      return res.data;
    } catch (err: any) {
      throw err.response?.data || "Something went wrong";
    }
  };

  return { markAttendance };
};
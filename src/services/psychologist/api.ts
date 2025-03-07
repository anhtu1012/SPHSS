import api from "../../config/axios";
import {
  AppointmentUpdateValue,
  BlogData,
  ReportData,
  TimeSlotCreateValues,
  TimeSlotUpdateValues,
} from "../../models/psy";

// Quản lý thời gian
export const getTimeSlot = () => {
  return api.get("/api/timeSlot");
};

export const getTimeSlotByUser = (id: string) => {
  return api.get(`/api/timeSlotByUser?user_id=${id}`);
};

export const createTimeSlot = (data: TimeSlotCreateValues) => {
  return api.post("/api/timeSlot-array", data);
};

export const updateTimeSlot = (id: string, data: TimeSlotUpdateValues) => {
  return api.put(`/api/timeSlot/${id}`, data);
};

export const deleteTimeSlot = (id: string) => {
  return api.delete(`/api/timeSlot/${id}`);
};

// Danh sách lịch hẹn với học sinh
export const getAppointmentsByPsychologist = (
  id: string,
  studentId?: string,
  status?: string,
  timeSlotId?: string
) => {
  let url = `/api/appointmentsByPychologist?user_id=${id}`;
  if (studentId !== undefined) {
    url += `&student_id=${studentId}`;
  }
  if (status !== undefined) {
    url += `&status=${status}`;
  }
  if (timeSlotId !== undefined) {
    url += `&time_slot_id=${timeSlotId}`;
  }
  return api.get(url);
};

export const updateStatusAppointment = (
  id: string,
  data: AppointmentUpdateValue
) => {
  return api.put(`/api/appointments/${id}`, data);
};

export const deleteAppointment = (id: string) => {
  return api.delete(`/api/appointments/${id}`);
};

// Quản lý blog
export const getMarkDown = () => {
  return api.get("/api/markdowns");
};

export const getCategory = () => {
  return api.get("/api/category");
};

export const createBlog = (data: BlogData) => {
  return api.post("/api/markdowns", data);
};

// Các chương trình hỗ trợ tâm lý
export const getProgram = () => {
  return api.get("/api/program");
};

export const getProgramDetail = (id: string) => {
  return api.get(`/api/program/${id}`);
};

// Danh sách bác sĩ
export const getListDoctors = (roleCode: string) => {
  return api.get(`api/users/${roleCode}`);
};

// Danh sách cuộc hẹn đã thành công
export const getFinishAppointment = (id: string) => {
  return api.get(
    `/api/appointmentsByPychologist?user_id=${id}&status=Approved`
  );
};

// Tạo báo cáo
export const createReport = (id: string, data: ReportData) => {
  return api.post(`/api/reports/appointment/${id}`, data);
};

export const getReports = () => {
  return api.get("/api/reports");
};

export const getDetailReport = (id: string) => {
  return api.get(`/api/reports/appointment/${id}`);
};

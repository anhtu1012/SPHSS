import api from "../../config/axios";
import {
  AppointmentUpdateValue,
  TimeSlotCreateValues,
  TimeSlotUpdateValues,
} from "../../models/psy";

// Quản lý Lịch hẹn
export const getTimeSlot = () => {
  return api.get("/api/timeSlot");
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

// Danh sách lịch khám với học sinh
export const getAppointment = () => {
  return api.get("/api/appointments");
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


export const getMarkDown = () => {
  return api.get("/api/markdowns");
};
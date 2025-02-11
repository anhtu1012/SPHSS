import api from "../../config/axios";

// Time slot
export const getTimeSlot = () => {
  return api.get("/api/timeSlot");
};

export const deleteTimeSlot = (id: string) => {
  return api.delete(`/api/timeSlot/${id}`);
};

// Appointment
export const getAppointment = () => {
  return api.get("/api/appointments");
};

export const deleteAppointment = (id: string) => {
  return api.delete(`/api/appointments/${id}`);
};

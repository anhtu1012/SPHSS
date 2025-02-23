import api from "../../../config/axios";

export const getTimeSlotByDoctorId = (doctorId: string) => {
  return api.get(`/api/timeSlotByUser?user_id=${doctorId}`);
};

export const getBlog = () => {
  return api.get("/api/markdowns");
};

export const getBlogDetail = (id: string) => {
  return api.get(`/api/markdowns/${id}`);
};

export const createAppointment = (payload: any) => {
  return api.post(`/api/appointments-array`, payload);
};

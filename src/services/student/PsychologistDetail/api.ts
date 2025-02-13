import api from "../../../config/axios";

export const getTimeSlotByDoctorId = (doctorId: string) => {
  return api.get(`/api/timeSlotByUser?user_id=${doctorId}`);
};

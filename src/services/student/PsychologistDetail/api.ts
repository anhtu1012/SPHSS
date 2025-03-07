/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../../../config/axios";
import { UpdateUser } from "../../../models/student";
import { SubmitResult } from "../../../models/surveyResult";

export const getTimeSlotByDoctorId = (doctorId: string) => {
  return api.get(`/api/timeSlotByUser?user_id=${doctorId}`);
};

// Danh sách blog
export const getBlog = () => {
  return api.get("/api/markdowns");
};

export const getBlogDetail = (id: string) => {
  return api.get(`/api/markdowns/${id}`);
};

// Lịch khám
export const getAppointmentByUser = (
  id: string,
  status?: string,
  time_slot_id?: string
) => {
  let url = `/api/appointmentsByUser?user_id=${id}`;
  if (status !== undefined) {
    url += `&status=${status}`;
  }
  if (time_slot_id !== undefined) {
    url += `&time_slot_id=${time_slot_id}`;
  }
  return api.get(url);
};

export const createAppointment = (payload: any) => {
  return api.post(`/api/appointments-array`, payload);
};

// Update profile
export const updateStudentProfile = (userCode: string, data: UpdateUser) => {
  return api.put(`/api/profile/${userCode}`, data);
};

// Khảo sát
export const getSurveys = () => {
  return api.get("/api/survey");
};

export const getSurveysAnswerAndQuestion = (id: string) => {
  return api.get(`/api/survey/${id}`);
};

export const submitSurvey = (data: SubmitResult) => {
  return api.post("/api/survey-result/submit", data);
};

export const getSurveyResultById = (id: string) => {
  return api.get(`/api/survey-result/${id}`);
};

export const getSurveyByUserId = (id: string) => {
  return api.get(`/api/survey-result/user/${id}`);
};

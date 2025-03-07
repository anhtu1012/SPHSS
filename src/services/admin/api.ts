import api from "../../config/axios";
import { CategorySurvey, User, Program, Program2, Survey, Question, QuestionOption } from "../../models/admin";

export const getReportAppointmentId = (appointment_id: string) => {
  const url = `/api/reports?appointment_id=${appointment_id}`;
  return api.get(url);
};

export const updateQuestionId = (userCode: string, data: User) => {
  return api.put(`/api/profile/${userCode}`, data);
};

export const getAppointmentsByPsychologist = (
  id: string
) => {
  const url = `/api/appointmentsByPychologist?user_id=${id}&status=Completed`;
  return api.get(url);
};

export const getReportId = () => {
  return api.get(`/api/reports`);
};

export const getAppointmentByUser = (
  id: string
) => {
  const url = `/api/appointmentsByUser?user_id=${id}&status=Completed`;
  return api.get(url);
};


export const createSurvey = (data: Survey) => {
  return api.post("/api/survey", data);
};

export const createQuestion = (data: Question) => {
  return api.post("/api/survey", data);
};

export const createOptionQuestion = (data: QuestionOption) => {
  return api.post("/api/survey", data);
};

export const deleteSurveyId = (id: string) => {
  return api.delete(`/api/survey/${id}`);
};

export const getSurveyId = (id: string) => {
  return api.get(`/api/survey/${id}`);
};

export const getAllSurvey = () => {
  return api.get("/api/survey");
};

export const getCategory = () => {
  return api.get("/api/category");
};

export const createCategory = (data: CategorySurvey) => {
  return api.post("/api/category", data);
};

export const getAllUser = () => {
  return api.get("/api/users");
};

export const updateUserInfo = (userCode: string, data: User) => {
  return api.put(`/api/profile/${userCode}`, data);
};

export const getUserId = (id: string) => {
  return api.get(`/api/public/users/${id}`);
};

export const changeUserStatus = (id: string, status: boolean) => {
  return api.put(`/api/users/${id}`, { status });
};

export const getUserRole = (roleCode: string) => {
  return api.get(`/api/users/${roleCode}`);
};

export const getAllPrograms = () => {
  return api.get("/api/program");
};

export const deleteProgramId = (programId: string) => {
  return api.delete(`/api/program/${programId}`);
};

export const updateProgramInfo = (programId: string, data: Program) => {
  return api.put(`/api/program/${programId}`, data);
};

export const createProgram = (data: Program2) => {
  return api.post("/api/program", data);
};

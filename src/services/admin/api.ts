import api from "../../config/axios";
import {
  CategorySurvey,
  User,
  Program,
  Program2,
  Survey,
  Question,
  QuestionOption,
  Account,
} from "../../models/admin";

export const deleteSurveyId = (id: string) => {
  return api.delete(`/api/survey/${id}`);
};

export const createUser = (data: Account) => {
  return api.post("/api/register", data);
};

export const deleteCategoryId = (id: string) => {
  return api.delete(`/api/category/${id}`);
};

export const getSurveyDetailId = (id: string) => {
  return api.get(`/api/survey/detail/${id}`);
};

import { AppointmentStatus } from "../../models/enum";

export const getReportAppointmentId = (
  appointment_id: string,
  report_id?: string
) => {
  let url = `/api/reports/appointment/${appointment_id}`;
  if (report_id) {
    url += `?report_id=${report_id}`;
  }
  return api.get(url);
};

export const updateQuestionId = (userCode: string, data: User) => {
  return api.put(`/api/profile/${userCode}`, data);
};

export const getAppointmentsByPsychologist = (
  id: string,
  status?: AppointmentStatus | null
) => {
  let url = `/api/appointmentsByPychologist?user_id=${id}`;
  if (status) {
    url += `&status=${status}`;
  }
  return api.get(url);
};

export const getReportId = () => {
  return api.get(`/api/reports`);
};

export const getAppointmentByUser = (id: string) => {
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

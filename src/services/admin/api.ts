import api from "../../config/axios";
import { CategorySurvey, User, Program } from "../../models/admin";

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

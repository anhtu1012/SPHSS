import api from "../../config/axios";
import { CategorySurvey,User } from "../../models/admin";

export const getCategory = () => {
  return api.get("/api/category");
};

export const createCategory = (data: CategorySurvey) => {
  return api.post("/api/category", data);
};

export const getAllUser = () => {
  return api.get("/api/users");
};

export const updateUser = (id: string, data: User) => {
  return api.put(`/api/user/${id}`, data);
};

export const getUserId = (id: string) => {
  return api.get(`/api/public/users/${id}`);
};


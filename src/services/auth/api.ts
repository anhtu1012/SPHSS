import api from "../../config/axios";
import { LoginFormValues, RegisterFormValues } from "../../models/login";

export const loginUser = (values: LoginFormValues) => {
  return api.post("/api/login", values);
};

export const register = (data: RegisterFormValues) => {
  return api.post("/api/register", data);
};

export const logoutUser = () => {
  return api.post("/api/auth/logout");
};

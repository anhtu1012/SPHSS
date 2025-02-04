import { UserRole } from "./enum";
export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: number;
  gender: string;
  roleCode: UserRole;
}

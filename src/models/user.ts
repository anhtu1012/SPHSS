import { UserRole } from "./enum";
// export interface User {
//   id: number;
//   fullName: string;
//   email: string;
//   phone: number;
//   gender: string;
//   roleCode: UserRole;
// }

export interface User {
  id: number;
  email: string;
  firstName: string;
  gender: string;
  image: string;
  lastName: string;
  phone: string;
  roleCode: UserRole;
  userCode: string;
  username: string;
}

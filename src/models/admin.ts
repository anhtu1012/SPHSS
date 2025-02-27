export interface User {
  id: string;
  username: string;
  email: string;
  userCode: string;
  status: string;
  phone: string;
  gender: string;
  role: string ; 
  lastName: string;
  firstName: string;
  description: string;
}

export interface CategorySurvey {
  categoryId?: string; 
  name: string; 
  description?: string;
}


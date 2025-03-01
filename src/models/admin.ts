export interface User {
  id: string;
  username: string;
  email: string;
  userCode: string;
  status: boolean;
  phone: string;
  gender: string;
  role: string;
  lastName: string;
  firstName: string;
  description: string;
  image: string;
  roleCode: string;
}

export interface CategorySurvey {
  categoryId?: string;
  name: string;
  description?: string;
}

export interface Program {
  programId: string;
  title: string;
  description: string;
  startDate:string;
  endDate: string;
  targetAudience: string;
  location: string;
  organizerEmail: string;
  contactPhone: string;
  imageUrl: string;
  price: string;
  rating: string;
  categoryId: string;
  time:string;
}

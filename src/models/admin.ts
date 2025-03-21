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
  password: string;
  createdBy: string;
}

export interface Account {
  username: string;
  email: string;
  userCode: string;
  phone: string;
  gender: string;
  lastName: string;
  firstName: string;
  roleCode: string;
  password: string;
  createdBy: string;
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
  categoryId: number;
  startDate: string;
  endDate: string;
  time: string;
  frequency: string;
  targetAudience: string;
  location: string;
  organizerEmail: string;
  contactPhone: string;
  imageUrl: string;
  price: number;
  rating: number;
}

export interface Program2 {
  title: string;
  description: string;
  categoryId: number;
  startDate: string;
  endDate: string;
  time: string;
  frequency: string;
  targetAudience: string;
  location: string;
  organizerEmail: string;
  contactPhone: string;
  imageUrl: string;
  price: number;
  rating: number;
}

export interface Report {
  report_id: string;
  appointment_id: number;
  user_id: string;
  health_level: string;
  health_status: string;
  feedback: string;
  recommendations: string;
  full_name_pys: string;
  psychologist_id: string;
  start_time: string;
  end_time: string;
  full_name: string;
  appointment_date: string;
  pys_email: string;
  pys_phone: string;
  student_id: string;
  createdAt: string;
}

export interface Survey {
  surveyId?: string;
  title: string;
  description: string;
  categoryId?: string;
  questions?: Question[];
  results?: SurveyResult[];
}

export interface SurveyResult {
  surveyResultId: string;
  userId?: string;
  surveyId?: string;
  depressionScore: string;
  anxietyScore: string;
  stressScore: string;
  depressionLevel: string;
  stressLevel: string;
  anxietyLevel: string;
  user: User;
  createdAt: string;
}

export interface Question {
  questionId?: string;
  surveyId?: string;
  questionText: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  optionId?: string;
  value: number;
  optionText: string;
  questionId?: string;
}

export interface AppointmentByUser {
  appointment_id: string;
  status: string;
  date: string;
  start_time: string;
  end_time: string;
  fullName: string;
}

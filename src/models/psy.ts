export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface TimeSlotCreateValues {
  user_id: string;
  slots: {
    start_time: string;
    end_time: string;
  }[];
}

export interface TimeSlotUpdateValues {
  start_time?: string;
  end_time?: string;
  status?: string;
}

export interface TimeSlotValues {
  time_slot_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  status: string;
  User: User;
}

export interface AppointmentData {
  appointment_id: string;
  fullName: string;
  start_time: string;
  end_time: string;
  status: string;
  date: string;
  linkMeeting: string;
}

export interface AppointmentUpdateValue {
  status: string;
  linkMeeting?: string;
}

export interface BlogData {
  contentHtml: string;
  contentMarkdown: string;
  imgageUrl: string;
  title: string;
  hashtag: string[];
  description: string;
  user_id: number;
  category_id: number;
}

export interface ProgramData {
  programId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  targetAudience: string;
  location: string;
  organizerEmail: string;
  contactPhone: string;
  imageUrl: string;
  price: number;
  rating: number;
  categoryId: string;
}

export interface ReportData {
  health_level: string;
  health_status: string;
  feedback: string;
  recommendations: string;
}

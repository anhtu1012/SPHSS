export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
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
  user_id: string;
  time_slot_id: string;
  date: string;
  status: string;
  user: User;
  timeSlot: {
    time_slot_id: string;
    start_time: string;
    end_time: string;
    status: string;
  };
}

export interface Program {
  programId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  time: string;
  frequency: string;
  targetAudience: string;
  location: string;
  organizerEmail: string;
  contactPhone: string;
  imageUrl: string;
  price: string;
  rating: number;
  categoryId: string;
  instructors: Instructor[];
}

interface Instructor {
  instructorId: string;
  instructorName: string;
  instructorImage: string;
  instructorTitle: string;
  instructorExperience: string;
  instructorDescription: string;
  programId: string;
}

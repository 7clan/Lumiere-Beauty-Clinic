export type UserRole = "CLIENT" | "ADMIN";

export type User = {
  id: string;
  email: string;
  fullName: string;
  phone?: string | null;
  role: UserRole;
};

export type Service = {
  id: string;
  name: string;
  slug: string;
  description: string;
  durationMinutes: number;
  imageUrl: string;
  priceFrom?: number | null;
  active: boolean;
};

export type AppointmentStatus = "REQUESTED" | "APPROVED" | "REJECTED" | "COMPLETED" | "CANCELLED";

export type Appointment = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  specialist?: string | null;
  notes?: string | null;
  status: AppointmentStatus;
  service: Service;
  createdAt: string;
};

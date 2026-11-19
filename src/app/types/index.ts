export type Role = "customer" | "vendor" | "admin";

export const CATEGORIES = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
];

export interface Service {
  _id: string;
  vendorId: string;
  vendorName: string;
  vendorBusinessName?: string;
  vendorImage?: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: "pending" | "approved" | "rejected";
  isActive: boolean;
  createdAt: string;
}

export interface Booking {
  _id: string;
  serviceId: string;
  serviceName: string;
  serviceImage: string;
  vendorId: string;
  vendorName: string;
  vendorBusinessName?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerImage?: string;
  eventDate: string;
  eventLocation: string;
  message: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  createdAt: string;
}

export interface Transaction {
  _id: string;
  vendorId: string;
  vendorName?: string;
  vendorEmail?: string;
  plan: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  stripeSubscriptionId: string | null;
  status: string;
  createdAt: string;
}

export interface AppUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: Role;
  isBlocked?: boolean;
  businessName?: string;
  phone?: string;
  subscriptionPlan?: string;
  subscriptionExpiresAt?: string | null;
  createdAt?: string;
}

export interface MeUser {
  id: string;
  name: string;
  email: string;
  image: string;
  role: Role;
  businessName: string;
  phone: string;
  subscriptionPlan: string;
}

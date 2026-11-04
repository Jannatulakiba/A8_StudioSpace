export type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  deposit: number;
  capacity: number;
  location: string;
  images: string[];
  amenities: string[];
  overview: string;
  rating: number;
  ownerName: string;
  ownerEmail: string;
  reviews?: Review[];
  createdAt: string;
};

export type Review = {
  userName: string;
  userEmail?: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type NewStudio = Omit<Studio, "_id" | "rating" | "createdAt" | "reviews">;

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export type Booking = {
  _id: string;
  studioId: string;
  studioTitle: string;
  userEmail: string;
  date: string;
  startHour: number;
  endHour: number;
  total: number;
  status: BookingStatus;
  createdAt: string;
};

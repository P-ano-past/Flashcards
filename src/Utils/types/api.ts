export interface QueryData {
  query: string;
}

export interface QueryResponse {
  flashcards: Flashcard[] | null;
  success: boolean;
  error?: string;
}

export interface PaymentData {
  amount: number;
  currency: string;
  description?: string;
}

export interface PaymentResponse {
  url: string;
  error?: string;
}

export interface Flashcard {
  question: string;
  answer: string;
}

export interface FormValues {
  query: string;
}

export const initialFormValues: FormValues = {
  query: "",
};

export interface QueryFormProps {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[] | null>>;
  initialFormValues: FormValues;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setQueryTopic: React.Dispatch<React.SetStateAction<string>>;
  submitted?: boolean;
}

export interface DonationDetails {
  amount: number;
  email: string;
  name: string;
}

export interface PaymentSession {
  sessionId: string;
  amount: number;
  currency: string;
  description: string;
  email: string;
  name: string;
}

export interface UserProfile {
  sub?: string;
  name?: string;
  email?: string;
  picture?: string;
  createdAt?: string;
  updatedAt?: string;
  roles: ("guest" | "premium" | "admin" | "user")[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

export interface ProfileResponse {
  token: string;
  data: UserProfile;
}

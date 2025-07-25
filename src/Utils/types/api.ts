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
  flashcards: Flashcard[] | null;
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcard[] | null>>;
  initialFormValues: FormValues;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
}

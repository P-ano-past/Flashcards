export interface QueryData {
  query: string;
}

export interface Flashcard {
  question: string;
  answer: string;
}

export interface QueryResponse {
  flashcards: Flashcard[] | null;
  success: boolean;
  error?: string;
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
}

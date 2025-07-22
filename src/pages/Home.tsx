import React, { useState } from "react";
import Header from "../components/Header";
import QueryForm from "../components/QueryForm";
import FlashcardContainer from "../components/FlashcardComponents/FlashcardContainer";
import { initialFormValues } from "../Utils/types/api";
import type { Flashcard, FormValues } from "../Utils/types/api";

export default function Home() {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Add loading state "Thinking..." on Gemini query
  // TODO: Disable submit button while Gemini is thinking
  // TODO: Add clear button to reset the form

  return (
    <div>
      <Header />
      <main className="p-6 max-w-3xl mx-auto">
        <QueryForm
          formValues={formValues}
          setFormValues={setFormValues}
          flashcards={flashcards}
          setFlashcards={setFlashcards}
          initialFormValues={initialFormValues}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <FlashcardContainer flashcards={flashcards} />
      </main>
    </div>
  );
}

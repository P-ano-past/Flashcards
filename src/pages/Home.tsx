import { useState, useEffect } from "react";
import Header from "../components/Header";
import QueryForm from "../components/QueryForm";
import FlashcardContainer from "../components/FlashcardComponents/FlashcardContainer";
import { initialFormValues } from "../Utils/types/api";
import type { Flashcard, FormValues } from "../Utils/types/api";
import { AnimatePresence, motion } from "framer-motion";
import { useHead } from "../Context/HeadContext";

export default function Home() {
  const { setTitle, setMeta } = useHead();
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [queryTopic, setQueryTopic] = useState("");

  useEffect(() => {
    setTitle("Home - PrepWise");
    setMeta("description", "Learn more about the PrepWise mission and team.");
  }, []);

  const handleReset = () => {
    setSubmitted(false);
    setQueryTopic("");
    setFlashcards(null);
    setFormValues(initialFormValues);
  };

  return (
    <div>
      <Header />
      <main className="p-6 max-w-3xl mx-auto space-y-6">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.8 } }}
              transition={{ duration: 0.4 }}
            >
              <QueryForm
                formValues={formValues}
                setFormValues={setFormValues}
                setFlashcards={setFlashcards}
                initialFormValues={initialFormValues}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setSubmitted={setSubmitted}
                setQueryTopic={setQueryTopic}
              />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10, transition: { duration: 0.8 } }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-100">
                  Results for:{" "}
                  <span className="text-blue-400">{queryTopic}</span>
                </h2>
                <button
                  onClick={handleReset}
                  className="bg-gray-700 text-gray-100 text-sm px-3 py-1 rounded hover:bg-gray-600 transition"
                >
                  New Query
                </button>
              </div>
              {flashcards && <FlashcardContainer flashcards={flashcards} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

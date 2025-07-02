import React, { useState } from "react";
import FlashcardCard from "./FlashcardCard";
import type { Flashcard } from "../../Utils/types/api";
import { motion } from "framer-motion";

type Props = {
  flashcards: Flashcard[] | null;
};

const FlashcardContainer: React.FC<Props> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!flashcards || flashcards.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No flashcards generated yet.
      </p>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="mt-6 flex flex-col items-center space-y-6 min-h-[400px]">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg px-4"
      >
        <FlashcardCard card={currentCard} />
      </motion.div>

      <div className="flex gap-4 z-10">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Card {currentIndex + 1} of {flashcards.length}
      </p>
    </div>
  );
};

export default FlashcardContainer;

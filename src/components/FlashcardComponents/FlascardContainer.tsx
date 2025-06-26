import React from "react";
import FlashcardCard from "./FlashcardCard";
import type { Flashcard } from "../../Utils/types/api";

type Props = {
  flashcards: Flashcard[] | null;
};

const FlashcardContainer: React.FC<Props> = ({ flashcards }) => {
  if (!flashcards || flashcards.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No flashcards generated yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {flashcards.map((card, index) => (
        <FlashcardCard key={index} card={card} />
      ))}
    </div>
  );
};

export default FlashcardContainer;

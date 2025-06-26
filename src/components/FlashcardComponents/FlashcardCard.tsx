import React from "react";
import type { Flashcard } from "../../Utils/types/api";

type Props = {
  card: Flashcard;
};

const FlashcardCard: React.FC<Props> = ({ card }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-300 border">
      <p className="font-semibold text-blue-700">Q: {card.question}</p>
      <p className="mt-2 text-gray-800">A: {card.answer}</p>
    </div>
  );
};

export default FlashcardCard;

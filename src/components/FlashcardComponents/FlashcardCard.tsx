import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Flashcard } from "../../Utils/types/api";
import { Card, CardContent, Typography } from "@mui/material";

type Props = {
  card: Flashcard;
};

const FlashcardCard: React.FC<Props> = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer perspective w-full max-w-md mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="relative w-full h-[250px]"
          initial={false}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full backface-hidden">
            <Card className="w-full h-full p-4 flex flex-col justify-center items-center shadow-lg">
              <CardContent>
                <Typography variant="h6" color="primary">
                  Q:
                </Typography>
                <Typography variant="body1">{card.question}</Typography>
              </CardContent>
            </Card>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full rotate-y-180 backface-hidden">
            <Card className="w-full h-full p-4 flex flex-col justify-center items-center shadow-lg">
              <CardContent>
                <Typography variant="h6" color="secondary">
                  A:
                </Typography>
                <Typography variant="body1">{card.answer}</Typography>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={flipped ? "back" : "front"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-center text-gray-400 mt-2"
        >
          {flipped ? "Click again to go back" : "Click card to flip"}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FlashcardCard;

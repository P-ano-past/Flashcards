import { RequestHandler } from "express";
import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
import { gemAIResponse } from "../controllers/gemAI";

export const sendQuery: RequestHandler = async (req, res) => {
  const USE_MOCK = true;
  console.log(`req.body.query`, req.body.query);
  console.log(`process.env.GEMINI_API_KEY`, process.env.GEMINI_API_KEY);
  if (req.body.query === "trigger-error") {
    res.status(400).json({ error: "Query is required" });
    return;
  }

  try {
    if (!req.body.query) {
      res.status(400).json({ error: "Query is required" });
      return;
    }

    let flashcardsText: string = "";

    if (USE_MOCK) {
      flashcardsText = gemAIResponse.result.candidates[0].content.parts[0].text;
    } else {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            parts: [
              {
                text: `You are an educational assistant helping a user study.
Generate 10 flashcards about "${req.body.query}". Each flashcard should be in this format:
Q: <question>
A: <answer>
Only return the flashcards. No extra explanations, no numbering, no titles.`,
              },
            ],
          },
        ],
      });
      if (!result?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid AI response format");
      }
      flashcardsText = result.candidates[0].content.parts[0].text;
    }

    const flashcards = parseFlashcards(flashcardsText);

    if (!flashcards || flashcards.length === 0) {
      res.status(400).json({ error: "No flashcards found in the response" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Flashcards generated successfully",
      flashcards,
    });
  } catch (error) {
    console.error("Failed to handle query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const parseFlashcards = (
  text: string
): { question: string; answer: string }[] => {
  try {
    return text.split("\n").reduce((acc, line, i, arr) => {
      if (line.startsWith("Q:")) {
        const question = line.slice(2).trim();
        const answerLine = arr[i + 1];
        if (answerLine?.startsWith("A:")) {
          const answer = answerLine.slice(2).trim();
          acc.push({ question, answer });
        }
      }
      return acc;
    }, [] as { question: string; answer: string }[]);
  } catch (error) {
    console.error("Failed to parse flashcards:", error);
    return [];
  }
};

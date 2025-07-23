import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const SubmitButton = styled(motion.button)<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ disabled }) =>
    disabled ? "#9CA3AF" : "#3B82F6"}; // gray-400 or blue-500
  color: white;
  font-weight: 600;
  padding: 0.5em 1em;
  border: none;
  border-radius: 0.5em;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  transition: background-color 0.2s ease, opacity 0.2s ease;
`;

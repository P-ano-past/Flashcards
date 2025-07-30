import React, { useState } from "react";
import type { QueryFormProps } from "../Utils/types/api";
import { Box, TextField, Container, Typography } from "@mui/material";
import QueryRoutes from "../Utils/QueryRoutes";
import { useAlert } from "../Context/AlertContext";
import { SubmitButton } from "./Buttons/SubmitButton";
import { Spinner } from "./Loading/Spinner";
import { motion, AnimatePresence } from "framer-motion";

const fadeVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10, transition: { duration: 1.8 } },
};

const QueryForm: React.FC<QueryFormProps> = ({
  formValues,
  setFormValues,
  setFlashcards,
  initialFormValues,
  isLoading,
  setIsLoading,
  setSubmitted,
  submitted,
  setQueryTopic,
}) => {
  const setToast = useAlert();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, query: e.target.value });
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.query.trim()) {
      setError("Please enter a query.");
      return;
    }

    const sendQuery = async () => {
      setIsLoading(true);
      setQueryTopic(formValues.query);
      setSubmitted(true);

      try {
        const sendQuery = await QueryRoutes.sendQuery(formValues);
        setToast({
          success: true,
          message: "Query submitted successfully!",
          show: true,
        });
        setFlashcards(sendQuery.flashcards);
        setFormValues(initialFormValues);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred.";
        setToast({
          success: false,
          message: errorMessage,
          show: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    sendQuery();
  };

  return (
    <Container maxWidth="sm">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 1.4 }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              className="bg-zinc-700 placeholder-white/80 border border-gray-600 focus:ring-2 focus:ring-gray-700 px-4 py-2 rounded "
              noValidate
              sx={{ mt: 4, display: "flex", gap: 2 }}
            >
              <TextField
                label="Your query"
                name="query"
                value={formValues.query}
                onChange={handleChange}
                fullWidth
                error={!!error}
                helperText={error}
                sx={{
                  input: {
                    color: "#ffffff",
                    "&::placeholder": {
                      color: "rgba(255, 255, 255, 0.8)",
                      opacity: 1,
                    },
                  },
                  label: {
                    color: "#afafaf",
                  },
                  fieldset: {
                    borderColor: "#afafaf",
                  },
                  "& .MuiOutlinedInput-root:hover fieldset": {
                    borderColor: "#afafaf",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#afafaf",
                  },
                }}
              />
              <SubmitButton
                type="submit"
                disabled={isLoading}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Thinking...
                  </>
                ) : (
                  "Submit"
                )}
              </SubmitButton>
            </Box>
          </motion.div>
        ) : (
          <motion.div
            key="result-header"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 2.4 }}
            className="mt-6"
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Results for:{" "}
              <span style={{ fontWeight: 600, color: "#3b82f6" }}>
                {formValues.query}
              </span>
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default QueryForm;

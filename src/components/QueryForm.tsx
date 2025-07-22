import React, { useState } from "react";
import type { QueryFormProps } from "../Utils/types/api";
import { Box, Button, TextField, Container } from "@mui/material";
import QueryRoutes from "../Utils/QueryRoutes";
import { useAlert } from "../Context/AlertContext";

const QueryForm: React.FC<QueryFormProps> = ({
  formValues,
  flashcards,
  setFormValues,
  setFlashcards,
  initialFormValues,
  isLoading,
  setIsLoading,
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

      try {
        const sendQuery = await QueryRoutes.sendQuery(formValues);
        console.log("sendQuery:", sendQuery);
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
      <Box
        component="form"
        onSubmit={handleSubmit}
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
        />
        <Button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 rounded ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          variant="contained"
        >
          {isLoading ? "Thinking..." : "Submit"}
        </Button>
        <Button
          onClick={() => {
            console.log(`flashcards`, flashcards);
          }}
          variant="contained"
        >
          testing state
        </Button>
      </Box>
    </Container>
  );
};

export default QueryForm;

import React, { useState } from "react";
import { Box, Button, TextField, Container } from "@mui/material";
import QueryRoutes from "../Utils/QueryRoutes";
import { useAlert } from "../Context/AlertContext";

interface FormValues {
  query: string;
}

const initialFormValues: FormValues = {
  query: "",
};

const QueryForm: React.FC = () => {
  const setToast = useAlert();
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
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
      try {
        const sendQuery = await QueryRoutes.sendQuery(formValues);
        console.log("sendQuery:", sendQuery);
        setToast({
          success: true,
          message: "Query submitted successfully!",
          show: true,
        });
        setFormValues(initialFormValues);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred.";

        setToast({
          success: false,
          message: errorMessage,
          show: true,
        });
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
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default QueryForm;

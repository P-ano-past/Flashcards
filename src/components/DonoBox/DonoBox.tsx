import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import DonoButtons from "./DonoButtons/DonoButtons";

const DonoBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-sm mx-auto mt-6"
    >
      <Card className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <CardContent className="flex flex-col items-center text-center">
          <Typography variant="h6" className="mb-2 text-yellow-600">
            ☕ Like the app?
          </Typography>
          <Typography
            variant="body2"
            className="mb-4 text-gray-600 dark:text-gray-800"
          >
            Support the dev with a small donation!
          </Typography>
          <DonoButtons />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DonoBox;

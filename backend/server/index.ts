// Entry point for the express server
import express from "express";
import routes from "./routes";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const frontendDistPath = path.join(__dirname, "../../dist");

app.use(express.static(frontendDistPath));

app.use("/api", routes);

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

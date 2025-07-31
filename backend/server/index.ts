// Entry point for the express server
import express from "express";
import session from "express-session";
import passport from "passport";
import routes from "./routes";
import path from "path";
const app = express();
const PORT = process.env.PORT || 3001;
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-session-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(cookieParser());
app.use(passport.session());

const frontendDistPath = path.join(__dirname, "../../dist");

app.use(express.static(frontendDistPath));

app.use("/api", routes);

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

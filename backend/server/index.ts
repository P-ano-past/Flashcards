// Entry point for the express server
import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import routes from "./routes";
import path from "path";
import { pool } from "./postgres/db";

const app = express();
const PORT = process.env.PORT || 3001;
import cookieParser from "cookie-parser";

app.use(express.json());

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is not defined in environment variables.");
}

app.use(
  session({
    store: new (pgSession(session))({
      pool: pool,
      tableName: "user_sessions",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // true if you're using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
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

pool
  .connect()
  .then(() => console.log("🟢 Connected Postgres DB to AWS - RDS"))
  .catch((err) => {
    console.error("🔴 DB connection error:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

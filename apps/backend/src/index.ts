import express from "express";
import "dotenv/config";
import cors from "cors";
import routes from "./routes/pageRouters"

const app = express();

const PORT = process.env.PORT || 3001;

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
];

/* ================= MIDDLEWARES ================= */

// CORS
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true, // allow cookies
  })
);

// Body parser
app.use(express.json());

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
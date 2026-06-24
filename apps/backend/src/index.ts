import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/pageRouters";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
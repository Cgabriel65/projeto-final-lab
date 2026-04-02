import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import textsRouter from "./routes/texts.js";
import commentsRouter from "./routes/comments.js";
import authorsRouter from "./routes/authors.js";
import likesRouter from "./routes/likes.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/auth", authRouter);
app.use("/texts", textsRouter);
app.use("/texts/:id/comments", commentsRouter);
app.use("/authors", authorsRouter);
app.use("/texts/:id/likes", likesRouter);


// Só arranca o servidor se for o entrypoint principal
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
export default app 
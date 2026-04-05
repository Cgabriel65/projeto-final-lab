import "dotenv/config"; //carrega automaticamente variavies do .env para process.env
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import textsRouter from "./routes/texts.js";
import commentsRouter from "./routes/comments.js";
import authorsRouter from "./routes/authors.js";
import likesRouter from "./routes/likes.js";
import profileRouter from "./routes/profile.js";

const app = express();

app.use(cors()); //permite que frontend aceda ao backend, sem isto browser bloqueia pedidos (portas diferentes)
app.use(express.json()); //permite que servidor leia JSON no body dos pedidos

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {  //health check
  res.send("API running");
});

app.use("/auth", authRouter);
app.use("/texts", textsRouter);
app.use("/texts/:id/comments", commentsRouter);
app.use("/authors", authorsRouter);
app.use("/texts/:id/likes", likesRouter);
app.use("/profile", profileRouter);



if (process.env.NODE_ENV !== 'test') { //só arranca servicodr se não estiver em modo de teste
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
export default app 
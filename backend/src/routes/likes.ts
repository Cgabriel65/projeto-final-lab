import { Router } from "express";
import { supabase } from "../supabase.js";
//
const router = Router({ mergeParams: true });

// Contar likes de um texto
router.get("/", async (req, res) => {
  const textId = (req.params as { id: string }).id;

  const { count, error } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("text_id", textId);

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.json({ count });
});

// Verificar se o utilizador já deu like
router.get("/:userId", async (req, res) => {
  const textId = (req.params as { id: string; userId: string }).id;
  const { userId } = req.params as { id: string; userId: string };

  const { data, error } = await supabase
    .from("likes")
    .select("id")
    .eq("text_id", textId)
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    res.status(400).json({ error: error.message });
    return;
  }

  res.json({ liked: !!data });
});

// Dar like
router.post("/", async (req, res) => {
  const textId = (req.params as { id: string }).id;
  const { user_id } = req.body;

  const { data, error } = await supabase
    .from("likes")
    .insert({ text_id: textId, user_id })
    .select()
    .single();

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(201).json(data);
});

// Remover like
router.delete("/", async (req, res) => {
  const textId = (req.params as { id: string }).id;
  const { user_id } = req.body;

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("text_id", textId)
    .eq("user_id", user_id);

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(204).send();
});

export default router;
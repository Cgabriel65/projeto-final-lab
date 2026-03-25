import { Router } from "express";
import { supabase } from "../supabase.js";

const router = Router();

// Listar todos os textos
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("texts")
    .select("*, profiles(username)")
    .order("created_at", { ascending: false }); //mais recente primeiro

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.json(data);
});

// Ver detalhes de 1 texto
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("texts")
    .select("*, profiles(username)")
    .eq("id", req.params.id)
    .single();

  if (error) {
    res.status(404).json({ error: "Text not found" });
    return;
  }

  res.json(data);
});

// Create
router.post("/", async (req, res) => {
  const { title, body, genre, author_id } = req.body;

  const { data, error } = await supabase
    .from("texts")
    .insert({ title, body, genre, author_id })
    .select()
    .single();

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(201).json(data);
});

// Edit
router.put("/:id", async (req, res) => {
  const { title, body, genre } = req.body;

  const { data, error } = await supabase
    .from("texts")
    .update({ title, body, genre, updated_at: new Date().toISOString() })
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.json(data);
});

// Delete
router.delete("/:id", async (req, res) => {
  const { error } = await supabase
    .from("texts")
    .delete()
    .eq("id", req.params.id);

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.status(204).send();
});

export default router;
import { Router } from "express";
import { supabase } from "../supabase.js";

const router = Router();

// Ver perfil
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("profiles")
    .select("*, texts(*)")
    .eq("id", id)
    .single();

  if (error) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  res.json(data);
});

// Editar bio
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { bio, username } = req.body;

  const { data, error } = await supabase
    .from("profiles")
    .update({ bio, username })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.json(data);
});

// Textos com like
router.get("/:id/liked-texts", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("likes")
    .select("text_id, texts(*, profiles(username))")
    .eq("user_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  res.json(data);
});

export default router;
import { Router } from "express";
import { supabase } from "../supabase.js";

const router = Router();


router.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*, texts(*)")
    .eq("id", req.params.id)
    .single();

  if (error) {
    res.status(404).json({ error: "Author not found" });
    return;
  }

  res.json(data);
});

export default router;
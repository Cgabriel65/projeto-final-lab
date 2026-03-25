import { Router } from "express";
import { supabase } from "../supabase.js";

const router = Router({ mergeParams: true });

// Listar comentários de um texto
router.get("/", async (req, res) => {
    const textId = (req.params as { id: string }).id;
    const { data, error } = await supabase
        .from("comments")
        .select("*, profiles(username)")
        .eq("text_id", textId)
        .order("created_at", { ascending: true });

    if (error) {
        res.status(400).json({ error: error.message });
        return;
    }

    res.json(data);
});

// Criar comentário num texto
router.post("/", async (req, res) => {
    const textId = (req.params as { id: string }).id;
    const { body, author_id } = req.body;

    const { data, error } = await supabase
    .from("comments")
    .insert({ body, author_id, text_id: textId })
    .select()
    .single();

    if (error) {
    res.status(400).json({ error: error.message });
    return;
    }

    res.status(201).json(data);
});

export default router;
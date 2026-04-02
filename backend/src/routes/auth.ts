import { Router } from "express";
import { supabase } from "../supabase.js";

const router = Router();


router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

 
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }


  const { error: profileError } = await supabase
    .from("profiles")
    .insert({ id: data.user!.id, username });

  if (profileError) {
    res.status(400).json({ error: profileError.message });
    return;
  }

  res.status(201).json({ message: "User created successfully" });
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    res.status(401).json({ error: error.message });
    return;
  }

  res.json({ token: data.session?.access_token, user: data.user });
});

export default router;
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!; // ! para assegurar ao ts que supabase_url n é undefined
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

